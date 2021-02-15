$(document).ready(()=>{
   //Menu
    $(".box").bind("click", ()=>{
        $("body").toggleClass('open');
        $('.bar').toggleClass('open');
        $('.menu_drop').toggleClass('open');
        $('.box').toggleClass('open');
    });
    //FooterPanel
      var triggerTabList =[].slice.call(document.querySelectorAll('#myList a'));
    triggerTabList.forEach(function (triggerEl) {
      var tabTrigger = new bootstrap.Tab(triggerEl);
      triggerEl.addEventListener('click', function (event) {
        event.preventDefault();
        tabTrigger.show();
      });
    });
    let full_width = $(window).innerWidth();
    if(full_width < 1365 || full_width == 1365){
        $(".footer_left_side").removeClass("col-5");
        $(".footer_left_side").addClass("col-12");
        $(".footer_right_side").removeClass("offset-1 col-6");
        $(".footer_right_side").addClass("col-12");
    }else{
        $(".footer_left_side").removeClass("col-12");
        $(".footer_left_side").addClass("col-5");
        $(".footer_right_side").removeClass("col-12");
        $(".footer_right_side").addClass("offset-1 col-6");
    }
    $(window).resize(function(){
        let full_width = $(window).innerWidth();
        if(full_width < 1365 || full_width == 1365){
            $(".footer_left_side").removeClass("col-5");
            $(".footer_left_side").addClass("col-12");
            $(".footer_right_side").removeClass("offset-1 col-6");
            $(".footer_right_side").addClass("col-12");
        }else{
            $(".footer_left_side").removeClass("col-12");
            $(".footer_left_side").addClass("col-5");
            $(".footer_right_side").removeClass("col-12");
            $(".footer_right_side").addClass("offset-1 col-6");
        }
    });
});