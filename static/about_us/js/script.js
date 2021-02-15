let swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    loop: true,
    spaceBetween: 2,
});
swiper.on('slideChange', function () {
    let a = swiper.activeIndex - 1;
    let slides = document.querySelector(".swiper-wrapper").children;
    $.each(slides, function(){
        let slide = $(this).data('swiper-slide-index');
        if(slide == a ){
            $(this).addClass('next_slide');
        }else{
            $(this).removeClass('next_slide');
        }
    });
});
let a = swiper.activeIndex - 1;
let slides = document.querySelector(".swiper-wrapper").children;
$.each(slides, function(){
    let slide = $(this).data('swiper-slide-index');
    if(slide == a ){
        $(this).addClass('next_slide');
    }else{
        $(this).removeClass('next_slide');
    }
});