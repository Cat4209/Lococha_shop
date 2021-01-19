$(document).ready(()=>{
//    Live a comment
//    $("#comment_form").on("submit", (e)=>{
//        e.preventDefault();
//    });
    const socket = io.connect('http://127.0.0.1:5000');
    $('#button_comment').on("click", ()=>{
         socket.send({
            'username': $('#name').val(),
            'msg': $('#review').val(),
            'vote': $("input[type='radio'][name='vote']:checked").val(),
            'email': $("#email").val(),
            'post': $("#post_slug").text()
        });
        $('#review').val('');      
    });
//    socket.on('message', data =>{
//       if(data.username === 'Service Message'){
//           $('.ul').append(`<li class="text-muted">User:${data.msg}</li>`);
//       } else{
//           $('.ul').append(`<li><span class="new_name">${data.username}</span><span class="new_message">${data.msg}</span><span class="new_vote">${data.vote}</span><span class="new_email">${data.email}</span></li>`);
//       }
//    });
    
    $(".guide").bind("click", ()=>{
        Swal.fire({
            icon: 'info',
            title: "<span style='font-family: Roboto;'>Please, choose one of colors and one of sizes. If you need, you can change count. <i class='fas fa-heart' style='color: red;'></i></span>",
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
    });
    let n = 1;
    $(".number_box_plus").bind("click", ()=>{
       n++;
      $(".input_number").val(n); 
    });
    $(".number_box_minus").bind("click", ()=>{
        if(n > 1){
            n--;
            $(".input_number").val(n); 
        }
    });
    let w = 1;
    $('.wish_text, .heart').bind('click', ()=>{
        w *= -1;
        if(w == -1){
            $(".heart").html("<i class='fas fa-heart'></i>");
            $(".wish_text").text("Delete from wishlist"); 
            $(".heart").addClass("active");
            $(".heart").css("color", "#fe5e82");
            $("#wish").val("on");
        }else{
            $(".heart").html("<i class='far fa-heart'></i>");
            $(".wish_text").text("Add to wishlist"); 
            $(".heart").removeClass("active");
            $(".heart").css("color", "#444");
            $("#wish").val("off");
        }
    });
    var firstTabEl = document.querySelector('.nav li a:last-child');
    var firstTab = new bootstrap.Tab(firstTabEl);

    firstTab.show();
    let messages = document.querySelectorAll('.message_container')
    messages.forEach(commentFunc);
    function commentFunc(item, index){
        if ((index % 2) == 1){
            $(item).css("margin-left", "100px");
        }
    }
    var galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 12,
      slidesPerView: 3,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
    });
    var galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      thumbs: {
        swiper: galleryThumbs
      },
    });
});