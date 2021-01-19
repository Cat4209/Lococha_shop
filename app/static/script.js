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
    if (full_width == 1365 || full_width < 1365){
        $(".footer_right_side").removeClass("col-6");
        $(".footer_right_side").removeClass("offset-2");
        $(".footer_left_side").removeClass("col-4");
        $(".footer_right_side").addClass("col-12");
        $(".footer_left_side").addClass("col-12");
    }else{
        $(".footer_right_side").removeClass("col-12");
        $(".footer_left_side").removeClass("col-12");
        $(".footer_right_side").addClass("col-6");
        $(".footer_right_side").addClass("offset-2");
        $(".footer_left_side").addClass("col-4");
    }
    $(window).resize(()=>{
        let full_width = $(document).innerWidth();
        if (full_width == 1365 || full_width < 1365){
        $(".footer_right_side").removeClass("offset-2");
        $(".footer_right_side").removeClass("col-6");
        $(".footer_left_side").removeClass("col-4");
        $(".footer_right_side").addClass("col-12");
        $(".footer_left_side").addClass("col-12");
    }else{
        $(".footer_right_side").removeClass("col-12");
        $(".footer_left_side").removeClass("col-12");
        $(".footer_right_side").addClass("offset-2");
        $(".footer_right_side").addClass("col-6");
        $(".footer_left_side").addClass("col-4");
    }
    });
});