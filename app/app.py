from flask import Flask, render_template, request, redirect, url_for, send_from_directory, session
import os
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import re
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager
from werkzeug.utils import secure_filename
from flask_socketio import SocketIO, send

UPLOAD_FOLDER = './static/uploads/'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

class CONFIGURATION(object):
    DEBUG = True
    SECRET_KEY = 4546
    SEND_FILE_MAX_AGE_DEFAULT = 0
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqlconnector://root:root@localhost/shop_lococha'
    UPLOAD_FOLDER = UPLOAD_FOLDER
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024


def allowed_file(filename):
    return '.' in filename and \
            filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS
    


app = Flask(__name__)
app.config.from_object(CONFIGURATION)
db = SQLAlchemy(app)

migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

socketio = SocketIO(app, cors_allowed_origins='*')

def slugify(s):
    pattern = r'[^\w+]'
    return re.sub(pattern, '-', s)

@socketio.on('message')
def handleMessage(data):
    send(data, broadcast=True)
    
    message = Comment(user_name=data['username'], email=data['email'], review=data['msg'], rating=data['vote'], postslug=data['post'])
    
    db.session.add(message)
    db.session.commit()

item_tags = db.Table('item_tags', 
                db.Column('item_id', db.Integer, db.ForeignKey('item.id')),
                db.Column('tag_id', db.Integer, db.ForeignKey('tag.id'))
)

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
    user_name = db.Column(db.String(24), nullable=False)
    created = db.Column(db.DateTime, default=datetime.now())
    month = db.Column(db.String(24), default=datetime.now().strftime("%B"))
    email = db.Column(db.String(320), nullable=False)
    review = db.Column(db.Text(), nullable=False)
    rating = db.Column(db.Integer(), nullable=False)
    postslug = db.Column(db.String(50), nullable=True)
    
    def __repr__(self):
        return self.review
    
    
@app.route('/')
def main():
    posts = Item.query.order_by(Item.created.desc())
    return render_template('main/index.html', posts=posts)

@app.route('/create', methods=['GET', 'POST'])
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
        
        item = Item(name=name, description=description, price=price, isActive=isActive, color=color, os=os, xs=xs, s=s, m=m, l=l, xl=xl, xxl=xxl, color_1=color_1, color_2=color_2, color_3=color_3, image=files_ready, image_2=files_2_ready, image_3=files_3_ready)
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
    return render_template('create/index.html')

@app.route('/shop/<slug>/', methods=['GET', 'POST'])
def item_details(slug):
    comments = Comment.query.filter(Comment.postslug == slug)
    page = request.args.get('page')
    
    if page and page.isdigit():
        page = int(page)
    else:
        page = 1
    
    pages = comments.paginate(page=page, per_page=4)
#    if request.method == "POST":
#        color = request.form['color']
#        size = request.form['size']
#        count = request.form['count']
#        wish = request.form['wish_list']
    post = Item.query.filter(Item.slug == slug).first()
    posts = Item.query.order_by(Item.created.desc()).limit(4)
    return render_template('item_details/index.html', post=post, pages=pages, posts=posts)

@app.route('/buy/<int:id>')
def buy(self, request, *args, **kwargs):
#    item = Item.query.get(id).price
    liqpay = LiqPay(1234565623, 12321321344)
    html = liqpay.cnb_form({
        'action': 'pay',
        'amount': '1',
        'currency': 'USD',
        'description': 'description text',
        'order_id': 'order_id_1',
        'version': '3'
    })
    return html
if __name__ == "__main__":
    socketio.run(app)