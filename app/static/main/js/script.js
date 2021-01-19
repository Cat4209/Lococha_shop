$(document).ready(()=>{
    //Scroll
    $(window).scroll(()=>{
       let st = $(this).scrollTop();
        if(st > 154){
            $(".second_section").css("position", "absolute");
            $(".second_section").css("transform","translateY("+(st - 91)+"px)");
            $(".second_section").css("height", "44px");
            $(".second_section").addClass("active");
            
        }else{
            $(".second_section").css("position", "relative");
            $(".second_section").css("transform","translateY(0px)");
            $(".second_section").css("height", "64px");
        $(".second_section").removeClass("active");
            
        }
    });
    //Swipers
    console.log(window.innerWidth);
    let swiper = new Swiper('.swiper-container-1',{
        parallax: true,
        speed: 900,
        navigation: {
            nextEl: '.swiper-button-next-1',
            prevEl: '.swiper-button-prev-1',
          },
        simulateTouch: true,
    });
    $(".swiper_pagination_1").click(function(){swiper.slideTo(0)});
    $(".swiper_pagination_2").click(function(){swiper.slideTo(1)});                     
    $(".swiper_pagination_3").click(function(){swiper.slideTo(2)});
    $(".swiper_pagination_4").click(function(){swiper.slideTo(3)});
    $(".swiper_pagination_1").attr("class", "swiper_pagination_active swiper_pagination swiper_pagination_1");
    swiper.on('slideChange', function (){
        let aI = swiper.activeIndex+1;
        $(".swiper_pagination").removeClass("swiper_pagination_active");
        $(".swiper_pagination_"+aI).attr("class", "swiper_pagination_active swiper_pagination swiper_pagination_"+aI);
        console.log(aI);
    });
    let swiper_2 = new Swiper('.swiper-container-2', {
        speed: 500,
        spaceBetween: 10,
    });
    let swiper_3 = new Swiper('.swiper-container-3', {
        speed: 800,
        effect: 'fade',
        simulateTouch: false,
    });
    swiper_2.on('slideChange', ()=>{
        let SecondSwiperActiveSlide = swiper_2.activeIndex;
        let SSAS = SecondSwiperActiveSlide+1;
        $(".swiper__pagination").removeClass("swiper__pagination_active");
        $(".swiper__pagination_"+SSAS).attr("class", "swiper__pagination_active swiper__pagination swiper__pagination_"+SSAS);
        swiper_3.slideTo(SecondSwiperActiveSlide);
    });
    $(".swiper__pagination_1").click(function(){swiper_2.slideTo(0)});
    $(".swiper__pagination_2").click(function(){swiper_2.slideTo(1)});                     
    $(".swiper__pagination_3").click(function(){swiper_2.slideTo(2)});
    $(".swiper__pagination_1").attr("class", "swiper__pagination_active swiper__pagination swiper__pagination_1");
    for(let i = 1; i <= 12; i++){
       $(".six_section_card_"+i).mouseenter(()=>{
        $(".view_buy_"+i).show();
        }).mouseleave(()=>{
            $(".view_buy").hide();
        }); 
    }
    //Fivth Section
    if (full_width == 820 || full_width < 820){
        $(".fivth_section_lside").removeClass("col-6");
        $(".fivth_section_rside").removeClass("col-6");
        $(".fivth_section_lside").addClass("col-12");
        $(".fivth_section_rside").addClass("col-12");
    }else{
        $(".fivth_section_lside").removeClass("col-12");
        $(".fivth_section_rside").removeClass("col-12");
        $(".fivth_section_lside").addClass("col-6");
        $(".fivth_section_rside").addClass("col-6");
    }
    $(window).resize(()=>{
        let full_width = $(document).innerWidth();
        if (full_width == 820 || full_width < 820){
            $(".fivth_section_lside").addClass("col-12");
            $(".fivth_section_rside").addClass("col-12");
            $(".fivth_section_lside").removeClass("col-6");
            $(".fivth_section_rside").removeClass("col-6");
        }else{
            $(".fivth_section_lside").addClass("col-6");
            $(".fivth_section_rside").addClass("col-6");
            $(".fivth_section_lside").removeClass("col-12");
            $(".fivth_section_rside").removeClass("col-12");
        }
    });
});
