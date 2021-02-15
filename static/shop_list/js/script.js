$(document).ready(()=>{
$(".postcategory a").on("click", (e)=>{
   e.preventDefault();
});
$('.postcategory_1 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 1 || post_cat != 1){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_2 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 1 || post_cat != 2){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_3 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 1 || post_cat != 3){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_4 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 2 || post_cat != 1){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_5 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 2 || post_cat != 2){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_6 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 2 || post_cat != 3){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_7 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 3 || post_cat != 1){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_8 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 3 || post_cat != 2){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$('.postcategory_9 a').on('click', ()=>{
    products = document.querySelector('.fourth_section_products').children;
    $.each(products, function(){
        let post_gen = $(this).data('gen');
        let post_cat = $(this).data('cat');
        if (post_gen != 3 || post_cat != 3){
            $(this).addClass("categoryHide");
        }else{
            $(this).removeClass("categoryHide");
        }
    });
});
$("[data-size='xs']").on('click', ()=>{
    $("[data-size-xs='off']").addClass('size_hide');
    $("[data-size-xs='on']").removeClass('size_hide');
});
$("[data-size='s']").on('click', ()=>{
    $("[data-size-s='off']").addClass('size_hide');
    $("[data-size-s='on']").removeClass('size_hide');
});
$("[data-size='m']").on('click', ()=>{
    $("[data-size-m='off']").addClass('size_hide');
    $("[data-size-m='on']").removeClass('size_hide');
});
$("[data-size='l']").on('click', ()=>{
    $("[data-size-l='off']").addClass('size_hide');
    $("[data-size-l='on']").removeClass('size_hide');
});
$("[data-size='xl']").on('click', ()=>{
    $("[data-size-xl='off']").addClass('size_hide');
    $("[data-size-xl='on']").removeClass('size_hide');
});
$("[data-size='xxl']").on('click', ()=>{
    $("[data-size-xxl='off']").addClass('size_hide');
    $("[data-size-xxl='on']").removeClass('size_hide');
});
let swiper;
$('.row_order').bind("click", (e)=>{
    e.preventDefault();
    $('.six_section_card').removeClass('col-4');
    $('.six_section_card').removeClass('col-6');
    $('.six_section_card').removeClass('col-12');
    $('.fourth_section_products').removeClass('row');
    $('.fourth_section_right_swiper').addClass('swiper-container');
    $('.fourth_section_products').addClass('swiper-wrapper');
    $('.fourth_section_products').css('display', 'static');
    if (full_width == 540 || full_width < 540){
        $('.six_section_card').css('height', '500px');
        $('.fourth_section_right').css('max-height', '600px');
    } else if (full_width == 730 || full_width < 730){
        $('.six_section_card').css('height', '800px');
        $('.fourth_section_right').css('max-height', '800px');
    } else{
        $('.six_section_card').css('height', '1000px');
        $('.fourth_section_right').css('max-height', '1000px');
    }
    $('.swiper_2_title a').css('font-size', '26px');
    $('.new_price').css('font-size', '22px');
    swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        slidesPerView: 1,
        speed: 600,
        spaceBetween: 30,
        mousewheel: true,
        pagination: {
            el: '.swiper-pagination',
        },
    });
    $('.pagination_container').css('margin-top', '24px');
});
$('.box_order').bind('click', (e)=>{
    e.preventDefault();
    swiper.destroy(true, true);
    swiper.update();
    if (full_width == 540 || full_width < 540){
        $(".six_section_card").removeClass(" col-6");
        $(".six_section_card").addClass("col-12");
    } else if (full_width == 730 || full_width < 730){
        $(".six_section_card").removeClass("col-4");
        $(".six_section_card").addClass("col-6");
    } else{
        $(".six_section_card").removeClass(" col-6");
        $(".six_section_card").removeClass(" col-12");
        $(".six_section_card").addClass(" col-4");
    }
    $('.fourth_section_products').addClass('row');
    $('.fourth_section_products').css('display', 'flex');
    $('.six_section_card').css('height', '470px');
    $('.fourth_section_right').css('max-height', 'none');
    $('.swiper_2_title a').css('font-size', '14px');
    $('.new_price').css('font-size', '16px');
    $('.pagination_container').css('margin-top', '0px');
});
function insertAfter(elem, refElem){
    return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
}    
    setTimeout(init2slider('range', 'rangeb', 'range1', 'range2', 'rangei1', 'rangei2'), 0);
let products = document.querySelector(".fourth_section_products");

function init2slider(idX, btwX, btn1X, btn2X, input1, input2) {
    var slider = document.getElementById(idX);
    var between = document.getElementById(btwX); 
    var button1 = document.getElementById(btn1X);
    var button2 = document.getElementById(btn2X);   
    var inpt1 = document.getElementById(input1); 
    var inpt2 = document.getElementById(input2); 
  	
            var min=inpt1.min;
  					var max=inpt1.max;
    
    /*init*/
    var sliderCoords = getCoords(slider);
    button1.style.marginLeft = '0px';
    button2.style.marginLeft = (slider.offsetWidth-button1.offsetWidth) + 'px';
    between.style.width = (slider.offsetWidth-button1.offsetWidth) + 'px';
    inpt1.value = min;
    inpt2.value = max;
    
    inpt1.onchange= function(evt)
    {
    	if (parseInt(inpt1.value) < min)
    		inpt1.value = min;
    	if (parseInt(inpt1.value) > max)
    		inpt1.value = max;
    	if (parseInt(inpt1.value) > parseInt(inpt2.value))
      {
      	var temp = inpt1.value;
    		inpt1.value = inpt2.value;
    		inpt2.value = temp;
      }
      
      
        var sliderCoords = getCoords(slider);
        var per1 = parseInt(inpt1.value-min)*100/(max-min);
        var per2 = parseInt(inpt2.value-min)*100/(max-min);
        var left1 = per1*(slider.offsetWidth-button1.offsetWidth)/100;
        var left2 = per2*(slider.offsetWidth-button1.offsetWidth)/100;
        
            button1.style.marginLeft = left1 + 'px'; 
            button2.style.marginLeft = left2 + 'px';
            
            if (left1 > left2)
              {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
              }
            else
              {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';  
              }
    }
    inpt2.onchange= function(evt)
    {
    	if (parseInt(inpt2.value) < min)
    		inpt2.value = min;
    	if (parseInt(inpt2.value) > max)
    		inpt2.value = max;
    	if (parseInt(inpt1.value) > parseInt(inpt2.value))
      {
      	var temp = inpt1.value;
    		inpt1.value = inpt2.value;
    		inpt2.value = temp;
      }
      
        var sliderCoords = getCoords(slider);
        var per1 = parseInt(inpt1.value-min)*100/(max-min);
        var per2 = parseInt(inpt2.value-min)*100/(max-min);
        var left1 = per1*(slider.offsetWidth-button1.offsetWidth)/100;
        var left2 = per2*(slider.offsetWidth-button1.offsetWidth)/100;
        
            button1.style.marginLeft = left1 + 'px'; 
            button2.style.marginLeft = left2 + 'px';
            
            if (left1 > left2)
              {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
              }
            else
              {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';  
              }
    }
  
    /*mouse*/
    button1.onmousedown = function(evt) {       
        var sliderCoords = getCoords(slider);
        var betweenCoords = getCoords(between); 
        var buttonCoords1 = getCoords(button1);
        var buttonCoords2 = getCoords(button2);
        var shiftX2 = evt.pageX - buttonCoords2.left; 
        var shiftX1 = evt.pageX - buttonCoords1.left;
      
        document.onmousemove = function(evt) {
            var left1 = evt.pageX - shiftX1 - sliderCoords.left;
            var right1 = slider.offsetWidth - button1.offsetWidth;
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;
            button1.style.marginLeft = left1 + 'px';  
            
            
    				shiftX2 = evt.pageX - buttonCoords2.left; 
            var left2 = evt.pageX - shiftX2 - sliderCoords.left;
            var right2 = slider.offsetWidth - button2.offsetWidth;
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;            
             
                var per_min = 0;
                var per_max = 0;
            if (left1 > left2)
              {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
                 
                per_min = left2*100/(slider.offsetWidth-button1.offsetWidth);
                per_max = left1*100/(slider.offsetWidth-button1.offsetWidth);
              }
            else
              {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';                
                
                per_min = left1*100/(slider.offsetWidth-button1.offsetWidth);
                per_max = left2*100/(slider.offsetWidth-button1.offsetWidth);
              }
                inpt1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
                inpt2.value= (parseInt(min)+Math.round((max-min)*per_max/100));
            let products_price = document.querySelector('.fourth_section_products').children;
            $.each(products_price, function(){
                let post_price = $(this).data('price');
                if(post_price < parseFloat(inpt1.value)){
                    $(this).addClass('price_hide');
                }else{
                    $(this).removeClass('price_hide');
                }
            });
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };
    
  button2.onmousedown = function(evt) {       
        var sliderCoords = getCoords(slider);
        var betweenCoords = getCoords(between); 
        var buttonCoords1 = getCoords(button1);
        var buttonCoords2 = getCoords(button2);
        var shiftX2 = evt.pageX - buttonCoords2.left; 
        var shiftX1 = evt.pageX - buttonCoords1.left;
      
        document.onmousemove = function(evt) {
            var left2 = evt.pageX - shiftX2 - sliderCoords.left;
            var right2 = slider.offsetWidth - button2.offsetWidth;
            if (left2 < 0) left2 = 0;
            if (left2 > right2) left2 = right2;
            button2.style.marginLeft = left2 + 'px';                      
          
          
            shiftX1 = evt.pageX - buttonCoords1.left; 
            var left1 = evt.pageX - shiftX1 - sliderCoords.left;
            var right1 = slider.offsetWidth - button1.offsetWidth;  
            if (left1 < 0) left1 = 0;
            if (left1 > right1) left1 = right1;                      
             
                var per_min = 0;
                var per_max = 0;
                
            if (left1 > left2)
              {
                between.style.width = (left1-left2) + 'px';
                between.style.marginLeft = left2 + 'px';
                per_min = left2*100/(slider.offsetWidth-button1.offsetWidth);
                per_max = left1*100/(slider.offsetWidth-button1.offsetWidth);
              }
            else
              {
                between.style.width = (left2-left1) + 'px';
                between.style.marginLeft = left1 + 'px';
                per_min = left1*100/(slider.offsetWidth-button1.offsetWidth);
                per_max = left2*100/(slider.offsetWidth-button1.offsetWidth);
              }
                inpt1.value= (parseInt(min)+Math.round((max-min)*per_min/100));
                inpt2.value= (parseInt(min)+Math.round((max-min)*per_max/100));
            let products_price = document.querySelector('.fourth_section_products').children;
            $.each(products_price, function(){
                let post_price = $(this).data('price');
                if(post_price > parseFloat(inpt2.value)){
                    $(this).addClass('price_hide');
                }else{
                    $(this).removeClass('price_hide');
                }
            });
        };
        document.onmouseup = function() {
            document.onmousemove = document.onmouseup = null;
        };
        return false;
    };
    
    button1.ondragstart = function() {
        return false;
    };
    button2.ondragstart = function() {
        return false;
    };

    function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }   
   }
    $('.first_category_title').bind('click', ()=>{
        $('.postcategory_container_1').toggleClass('active');
        $('.first_category_title').toggleClass('active');
    });
    $('.second_category_title').bind('click', ()=>{
        $('.postcategory_container_2').toggleClass('active');
        $('.second_category_title').toggleClass('active');
    });
    $('.third_category_title').bind('click', ()=>{
        $('.postcategory_container_3').toggleClass('active');
        $('.third_category_title').toggleClass('active');
    });
    let full_width = $(window).innerWidth();
if (full_width == 646 || full_width < 646){
        $(".six_section_card_2").removeClass("col-6");
        $(".six_section_card_2").addClass("col-12");
    }else{
        $(".six_section_card_2").removeClass("col-12");
        $(".six_section_card_2").addClass("col-6");
}
if (full_width == 540 || full_width < 540){
    $(".six_section_card").removeClass(" col-6");
    $(".six_section_card").addClass("col-12");
} else if (full_width == 730 || full_width < 730){
    $(".six_section_card").removeClass("col-4");
    $(".six_section_card").addClass("col-6");
} else{
    $(".six_section_card").removeClass(" col-6");
    $(".six_section_card").removeClass(" col-12");
    $(".six_section_card").addClass(" col-4");
}
let h = 1;
$(".box_fl").on("click", ()=>{
    if(h > 0){
        $(".fourth_section_left").addClass("open");
        $(".box_fl").addClass("open");
        $(".box_bar").addClass("open");
        h *= -1;
    }else{
        $(".fourth_section_left").removeClass("open");
        $(".box_fl").removeClass("open");
        $(".box_bar").removeClass("open");
        h *= -1;
    }
});
$(window).resize(()=>{
    let full_width = $(window).innerWidth();
    if (full_width == 540 || full_width < 540){
        $(".six_section_card").removeClass(" col-6");
        $(".six_section_card").addClass("col-12");
    } else if (full_width == 730 || full_width < 730){
        $(".six_section_card").removeClass("col-4");
        $(".six_section_card").addClass("col-6");
    } else{
        $(".six_section_card").removeClass(" col-6");
        $(".six_section_card").removeClass(" col-12");
        $(".six_section_card").addClass(" col-4");
    }
    if (full_width == 646 || full_width < 646){
            $(".six_section_card_2").removeClass("col-6");
            $(".six_section_card_2").addClass("col-12");
        }else{
            $(".six_section_card_2").removeClass("col-12");
            $(".six_section_card_2").addClass("col-6");
        }
    });
});