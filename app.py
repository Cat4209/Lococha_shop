from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session, flash
import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import re
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, send
from flask_admin import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from flask_security import UserMixin, RoleMixin, SQLAlchemyUserDatastore, Security, login_required, current_user
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_mail import Mail, Message
from cloudipsp import Api, Checkout

### Configurations
UPLOAD_FOLDER = './static/uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

class CONFIGURATION(object):
    DEBUG = True
    SECRET_KEY = '454647'
    SEND_FILE_MAX_AGE_DEFAULT = 0
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:root@localhost/shop_lococha'
    UPLOAD_FOLDER = UPLOAD_FOLDER
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024
    SECURITY_PASSWORD_SALT = 'salt'
    SECURITY_PASSWORD_HASH = 'bcrypt'
    SECURITY_REGISTERABLE = True
    COOKIE_SECURE = 'Secure'
    COOKIE_DURATION = timedelta(minutes=15)
    PERMANENT_SESSION_LIFETIME = timedelta(days=365)
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_SSL = False
    MAIL_USE_TLS = True
    MAIL_USERMAME = '...'
    MAIL_PASSWORD = '...'
    MAIL_DEFAULT_SENDER = '...'
    TESTING = False
    MAIL_MAX_EMAILS = None
    MAIL_ASCII_ATTACHMENTS = False

def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
    


app = Flask(__name__)
db = SQLAlchemy(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

socketio = SocketIO(app, cors_allowed_origins='*')

mail = Mail(app)
app.config.from_object(CONFIGURATION)

def slugify(s):
    pattern = r'[^\w+]'
    return re.sub(pattern, '-', s)

### Messages
@socketio.on('message')
def handleMessage(data):
    send(data, broadcast=True)
    
    message = Comment(user_name=data['username'], email=data['email'], review=data['msg'], rating=data['vote'], postslug=data['post'])
    
    db.session.add(message)
    db.session.commit()

    
### Tables
item_tags = db.Table('item_tags', 
                db.Column('item_id', db.Integer, db.ForeignKey('item.id')),
                db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'))
                    )
user_roles = db.Table('user_roles', 
                    db.Column('user_id', db.Integer, db.ForeignKey('role.id')),
                    db.Column('role_id', db.Integer, db.ForeignKey('user.id'))
                    )
user_items = db.Table('user_items', 
                    db.Column('user_id', db.Integer, db.ForeignKey('user.id')),
                    db.Column('item_id', db.Integer, db.ForeignKey('item.id'))
                    )

### Date Bases
class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    slug = db.Column(db.String(50), unique=True)
    description = db.Column(db.String(5000), nullable=False)
    price = db.Column(db.Float(), nullable=False)
    color = db.Column(db.String(16), nullable=False)
    color_1 = db.Column(db.String(16), nullable=True, default=None)
    color_2 = db.Column(db.String(16), nullable=True, default=None)
    color_3 = db.Column(db.String(16), nullable=True, default=None)
    isActive = db.Column(db.Text(), default="on")
    created = db.Column(db.DateTime, default=datetime.now())
    image = db.Column(db.String(255), nullable=False)
    image_2 = db.Column(db.String(255), nullable=True, default=None)
    image_3 = db.Column(db.String(255), nullable=True, default=None)
    os = db.Column(db.Text(), default="off")
    xs = db.Column(db.Text(), default="off")
    s = db.Column(db.Text(), default="off")
    m = db.Column(db.Text(), default="off")
    l = db.Column(db.Text(), default="off")
    xl = db.Column(db.Text(), default="off")
    xxl = db.Column(db.Text(), default="off")
    category_1 = db.Column(db.String(4), nullable=False)
    category_2 = db.Column(db.String(4), nullable=False)
    
    tags = db.relationship('Tag', secondary = item_tags, backref=db.backref('items', lazy='dynamic'))
    
    def __init__(self, *args, **kwargs):
        super(Item, self).__init__(*args, **kwargs)
        self.generate_slug()
    
    def generate_slug(self):
        if self.name:
            self.slug = slugify(self.name)
            
    def __repr__(self):
        return self.name
    
    
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False, unique=True)
    slug = db.Column(db.String(25), nullable=False, unique=True)
    
    def __init__(self, *args, **kwargs):
        super(Tag, self).__init__(*args, **kwargs)
        self.generate_slug()
    
    def generate_slug(self):
        if self.title:
            self.slug = slugify(self.title)
            
    def __repr__(self):
        return self.title
    
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_name = db.Column(db.String(36), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())
    month = db.Column(db.String(24), default=datetime.now().strftime("%B"))
    email = db.Column(db.String(320), nullable=False)
    review = db.Column(db.Text(), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)
    postslug = db.Column(db.String(50), nullable=True)
    
    def __repr__(self):
        return self.review
    
    
class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(255), unique=True, nullable=False)
    active = db.Column(db.Boolean(), default=True)
    
    wishlist = db.relationship('Item', secondary = user_items, backref=db.backref('users', lazy='dynamic'))
        
    roles = db.relationship('Role', secondary = user_roles, backref=db.backref('users', lazy='dynamic'))

class Purchase(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    total = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    lastName = db.Column(db.String(120), nullable=False)
    company = db.Column(db.String(100), nullable=True)
    address = db.Column(db.Text(), nullable=False)
    city = db.Column(db.Text(), nullable=False)
    country = db.Column(db.String(2), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    post_name = db.Column(db.String(50), nullable=False)
    post_size = db.Column(db.String(4), nullable=False)
    post_color = db.Column(db.String(7), nullable=False)
    post_count = db.Column(db.Integer, nullable=False)
    date = db.Column(db.DateTime, default=datetime.now())
    
    

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(24), unique=True)
    roleDescription = db.Column(db.Text())


class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    post_name = db.Column(db.String(50), nullable=False)
    post_size = db.Column(db.String(4), nullable=False)
    post_color = db.Column(db.String(7), nullable=False)
    post_count = db.Column(db.Integer, default=1, nullable=True)
    created = db.Column(db.DateTime, default=datetime.now())
    post_price = db.Column(db.Float(), nullable=False)
    post_image = db.Column(db.String(255), nullable=False)
    post_slug = db.Column(db.String(50), unique=True)

    

### Sites
@app.errorhandler(404)
@app.errorhandler(500)
def page_not_found(e):
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('404/index.html', lc=lc, wishes_count=wishes_count), 404

@app.route('/subscribe', methods=['POST'])
def sendMessage():
    email = request.form['email']
    msg = MIMEMultipart()
    message = "Thank You! You have already subscribed!"
    msg.attach(MIMEText(message, 'plain'))
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login("...", "...")
    server.sendmail("...", email, msg.as_string())
    return redirect(url_for('main'))
@app.route('/')
def main():
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    posts = Item.query.order_by(Item.created.desc())
    return render_template('main/index.html', posts=posts, wishes_count=wishes_count, lc=lc)

@app.route('/create', methods=['GET', 'POST'])
@login_required
def create():
    if request.method == 'POST':
        file = request.files['image']
        name = request.form['name']
        description = request.form['description']
        price = request.form['price']
        isActive = request.form['isActive']
        color = request.form['color']
        os = request.form['os']
        xs = request.form['xs']
        s = request.form['s']
        m = request.form['m']
        l = request.form['l']
        xl = request.form['xl']
        xxl = request.form['xxl']
        hot = request.form['Hot']
        new = request.form['New']
        sale = request.form['Sale']
        category_1 = request.form['GenderCat']
        category_2 = request.form['ClothCat']
        
        if category_1 != '0' and category_2 != '0':
            try:
                file_2 = request.files['image_2']
            except:
                file_2 = None
            try:
                file_3 = request.files['image_3']
            except:
                file_3 = None
            try:
                color_1 = request.form['color_1']
            except:
                color_1 = None
            try:
                color_2 = request.form['color_2']
            except:
                color_2 = None
            try:
                color_3 = request.form['color_3']
            except:
                color_3 = None

            if file and allowed_file(file.filename):
                files = str(file)
                files_ready = files[15:-17:1]
                filename = secure_filename(file.filename)
            else:
                return "Image Loading Error"
            if file_2 and allowed_file(file_2.filename):
                global files_2_ready
                files = str(file_2)
                files_2_ready = files[15:-17:1]
                filename = secure_filename(file_2.filename)
            else:
                files_2_ready = None
            if file_3 and allowed_file(file_3.filename):
                global files_3_ready
                files = str(file_3)
                files_3_ready = files[15:-17:1]
                filename = secure_filename(file_3.filename)
            else:
                files_3_ready = None

            item = Item(name=name, description=description, price=price, isActive=isActive, color=color, os=os, xs=xs, s=s, m=m, l=l, xl=xl, xxl=xxl, color_1=color_1, color_2=color_2, color_3=color_3, image=files_ready, image_2=files_2_ready, image_3=files_3_ready, category_1=category_1, category_2=category_2)
        if hot == "on":
            item.tags.append(Tag.query.filter(Tag.title=="Hot").first())
        if new == "on":
            item.tags.append(Tag.query.filter(Tag.title=="New").first())
        if sale == "on":
            item.tags.append(Tag.query.filter(Tag.title=="Sale").first())
        try:
            db.session.add(item)
            db.session.commit()
            return redirect(url_for('item_details', slug=item.slug))
        except:
            return "Fatal Error"
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('create/index.html', wishes_count=wishes_count, lc=lc)

@app.route('/shop/<slug>/', methods=['GET', 'POST'])
def item_details(slug):
    comments = Comment.query.filter(Comment.postslug == slug)
    page = request.args.get('page')
    if page and page.isdigit():
        page = int(page)
    else:
        page = 1
    pages = comments.paginate(page=page, per_page=4)
    post = Item.query.filter(Item.slug == slug).first_or_404()
    post_users_len = len(post.users.all())
    posts = Item.query.order_by(Item.created.desc()).limit(4)
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
        user = ""
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('item_details/index.html', post=post, pages=pages, posts=posts, post_users_len=post_users_len, wishes_count=wishes_count, lc=lc, user=user)

@app.route('/product_list', methods=['GET', 'POST'])
def product_list():
    arguments = request.args.to_dict()
    arguments_len = len(request.args.to_dict())
    
    page = request.args.get('page')
    
    search = request.args.get('search')
    
    order = request.args.get('order')
    
    tag = request.args.get('tag')
    
    if page and page.isdigit():
        page = int(page)
    else:
        page = 1
        
    if search:
        items = Item.query.filter(Item.name.contains(search))
    else:
        items = Item.query
    
    if tag:
        tag = Tag.query.filter(Tag.slug == tag).first_or_404()
        pages = tag.items
        if order == '1':
            pages = pages.order_by(Item.price.asc()).paginate(page=page, per_page=6)
        elif order == '2':
            pages = pages.order_by(Item.price.desc()).paginate(page=page, per_page=6)
        elif order == '3':
            pages = pages.order_by(Item.created.desc()).paginate(page=page, per_page=6)
        else:
            pages = pages.paginate(page=page, per_page=6)
    else:
        if order == '1':
            pages = items.order_by(Item.price.asc()).paginate(page=page, per_page=6)
        elif order == '2':
            pages = items.order_by(Item.price.desc()).paginate(page=page, per_page=6)
        else:
            pages = items.paginate(page=page, per_page=6)
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('product_list/index.html', pages=pages, items=items, arguments=arguments, arguments_len=arguments_len, wishes_count=wishes_count, lc=lc)


@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email_to']
        message = request.form['message']
        msg = MIMEMultipart()
        msg.attach(MIMEText("<em>"+email+"</em>"+"<p></p><b>"+name+"</b><p></p><em>"+message+"</em>", 'html'))
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login("..", "...")
        server.sendmail("..", "..", msg.as_string())
        flash("Message has been successfuly sent!")
        return redirect(url_for("contact"))
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('contact/index.html', wishes_count=wishes_count, lc=lc, os=os)

@app.route('/about_us')
def about_us():
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('about_us/index.html', wishes_count=wishes_count, lc=lc)

@app.route('/wishlist', methods=['GET', 'POST'])
@login_required
def wishlist():
    if request.method == 'POST':
        post_slug = request.form['wish_slug']
        carts = Cart.query.filter(Cart.post_slug == post_slug).all()
        if len(carts) == 0:
            user_id = current_user.get_id()
            post = Item.query.filter(Item.slug==post_slug).first_or_404()
            post_name = post.name
            post_size = request.form['size_'+str(post_slug)]
            post_color = request.form['color']
            post_count = 1
            post_price = post.price
            post_image = post.image
            cart = Cart(user_id=user_id, post_slug=post_slug, post_name=post_name, post_size=post_size, post_color=post_color, post_count=post_count, post_price=post_price, post_image=post_image)
            db.session.add(cart)
            db.session.commit()
            return redirect(url_for('cart'))
        else:
            return redirect(url_for('wishlist'))
    wishes = []
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    for wish in user.wishlist:
        item = Item.query.filter(Item.name == str(wish)).first_or_404()
        wishes.append(item)
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('wishlist/index.html', user=user, wishes=wishes, wishes_count=wishes_count, lc=lc)
@app.route('/delete_wish/<slug>')
@login_required
def delete_wish(slug):
    post = Item.query.filter(Item.slug == slug).first_or_404()
    user_id = current_user.get_id()
    user = User.query.filter(User.id == user_id).first_or_404()
    insex_wish = user.wishlist.index(post)
    user.wishlist.pop(insex_wish)
    db.session.commit()
    return redirect(url_for('wishlist'))
@app.route('/wishadd/<slug>', methods=['GET', 'POST'])
def add_wish(slug):
    post = Item.query.filter(Item.slug == slug).first_or_404()
    user_id = current_user.get_id()
    user = User.query.filter(User.id == user_id).first_or_404()
    if post in user.wishlist:
        flash("Item was removed from wishlist.", "error")
        index_wish = user.wishlist.index(post)
        user.wishlist.pop(index_wish)
        db.session.commit()
        return redirect(url_for('item_details', slug=slug))
    else:
        flash("Item was added in wishlist.", "success")
        user.wishlist.append(post)
        db.session.commit()
        return redirect(url_for('item_details', slug=slug))
    return redirect(url_for('item_details', slug=slug))

@app.route('/cart', methods=['GET', 'POST'])
def cart():
    if request.method == 'POST':
        session['total'] = request.form['total']
        session['shipping'] = request.form['shipping']
        session['subtotal'] = request.form['subtotal']
        return redirect(url_for('check_out'))
    user_id = current_user.get_id()
    cart = Cart.query.filter(Cart.user_id == user_id).all()
    posts = []
    for cart_item in cart:
        c = Item.query.filter(Item.name==cart_item.post_name).first_or_404()
        posts.append(c)
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    return render_template('cart/index.html', cart=cart, posts=posts, lc=len(posts), wishes_count=wishes_count)
@app.route('/cart/check', methods=['GET', 'POST'])
@login_required
def check_out():
    if request.method == 'POST':
        total = request.form['total']
        fname = request.form['fname']
        lname = request.form['lname']
        try:
            company = request.form['company']
        except:
            comapny = ""
        address = request.form['addres']
        city = request.form['city']
        country = request.form['country']
        email = request.form['email']
        tel = request.form['tel']
        user_id = current_user.get_id()
        carts = Cart.query.filter(Cart.user_id == user_id).all()
        for cart in carts:
            purchase = Purchase(user_id=user_id, total=total, name=fname, lastName=lname, company=company, address=address, city=city, country=country, email=email, phone=tel, post_name=cart.post_name, post_size=cart.post_size, post_color=cart.post_color, post_count=cart.post_count)
            db.session.add(purchase)
            db.session.delete(cart)
        try:
            db.session.commit()
            return redirect(url_for('buy', total=purchase.total))
        except:
            return "Error"
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
        cart = len(Cart.query.filter(Cart.user_id == user_id).all())
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('check/index.html', lc=lc, wishes_count=wishes_count, cart=cart)
@app.route('/cart_add', methods=['POST'])
@login_required
def add_to_cart():
    if request.method == 'POST':
        post_slug = request.form['post_slug']
        post = Item.query.filter(Item.slug == post_slug).first_or_404()
        post_name = post.name
        post_price = post.price
        post_image = post.image
        user_id = current_user.get_id()
        post_size = request.form['size']
        post_color = request.form['color']
        post_count = request.form['count']
        try:
            cart = Cart(user_id=user_id, post_name=post_name, post_size=post_size, post_color=post_color, post_count=post_count, post_price=post_price, post_image=post_image, post_slug=post_slug)
            db.session.add(cart)
            db.session.commit()
            return redirect(url_for('cart'))
        except:
            return "Error Adding. Something go wrong!"
        
@app.route('/cart_delete/<id>')
@login_required
def cart_delete(id):
    cart = Cart.query.filter(Cart.id == id).first_or_404()
    db.session.delete(cart)
    db.session.commit()
    return redirect(url_for('cart'))

@app.route('/support', methods=['GET', 'POST'])
def support():
    if request.method == 'POST':
        donate = request.form['donate']
        api = Api(merchant_id=1397120,
          secret_key='test')
        checkout = Checkout(api=api)
        data = {
            "currency": "USD",
            "amount": str(donate) + '00'
        }
        url = checkout.url(data).get('checkout_url')
        session['donate'] = "Thank You for Your support! I appreciate it."
        return redirect(url) 
    try:
        user_id = current_user.get_id()
        user = User.query.filter(User.id == user_id).first_or_404()
        wishes_count = len(user.wishlist)
    except:
        wishes_count = 0
    if current_user.is_authenticated:
        lc = len(Cart.query.filter(Cart.user_id == current_user.get_id()).all())
    else:
        lc = 0
    return render_template('support/index.html', wishes_count=wishes_count, lc=lc)
@app.route('/buy')
def buy():
    total = request.args.get('total')
    api = Api(merchant_id=1397120,
        secret_key='test')
    checkout = Checkout(api=api)
    data = {
        "currency": "RUB",
        "amount": str(total) + '00'
    }
    url = checkout.url(data).get('checkout_url')
    return redirect(url)


### Admin
class MixinAdmin:
    def is_accessible(self):
        return current_user.has_role('admin')
    
    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('security.login', next=request.url ))
    
class BaseModelView(ModelView):
    def on_model_change(self, form, model, is_created):
        model.generate_slug()
        return super(BaseModelView, self).on_model_change(form, model, is_created)

class PostAdminView(MixinAdmin, BaseModelView):
    form_columns = ['name', 'description', 'tags', 'price', 'color', 'color_1', 'color_2', 'color_3', 'isActive', 'image', 'image_2', 'image_3', 'os', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'category_1', 'category_2']

class TagAdminView(MixinAdmin, BaseModelView):
    form_columns = ['title', 'items']

class AdminView(MixinAdmin, ModelView):
    pass

class HomeAdminView(MixinAdmin, AdminIndexView):
    pass

    

admin = Admin(app, 'FlaskApp', url='/', index_view=HomeAdminView(name='Home'))
admin.add_view(PostAdminView(Item, db.session))
admin.add_view(TagAdminView(Tag, db.session))
admin.add_view(AdminView(Comment, db.session))
admin.add_view(AdminView(User, db.session))
admin.add_view(AdminView(Role, db.session))

### Flask Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

### Start
if __name__ == "__main__":
    socketio.run(app)
