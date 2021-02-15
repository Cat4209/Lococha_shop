$(document).ready(()=>{
    container = document.querySelector('.third_section_left');
    const discounts = ['34er5', 'kara', '1k3a'];
    let grand, subtotal, Tax, shipping;
    let r = 0;
    let sum  = 0;
    for(let i = 0; i < container.children.length; i++){
        let price = Number(container.children[i].getAttribute("data-price"));
        let count = Number(container.children[i].getAttribute("data-count"));
        sum += price*count;
    }
    function roundToTwo(num){
        subtotal = +(Math.round(num + "e+2") + "e-2");
        $(".subtotal_price").text(subtotal);
        Tax = +(Math.round(subtotal*0.03 + "e+2") + "e-2");
        $(".tax_price").text(Tax);
        shipping = 0.5;
        $(".shiping_price").text(shipping);
        grand = +(Math.round(subtotal+Tax+shipping + "e+2") + "e-2");
        $(".grand_price").text(grand);
        $("input[name='total']").val(grand);
        $("input[name='subtotal']").val(subtotal);
        $("input[name='shipping']").val(shipping);
        return false;
    }
    $(".discount_btn").on("click", ()=>{
        if(r === 0){
            let dsc = $("input[name='discount']").val();
            for(let d = 0; d < discounts.length; d++){
                if(discounts[d] == dsc){
                    grand *= 0.85;
                    $(".grand_price").text(+(Math.round(grand + "e+2") + "e-2"));
                    r++;
                    $(".alert-success").css('display', 'block');
                    $(".alert-success").text('Discount was confirmed, you\'r welcome' );
                    $("input[name='total']").val(+(Math.round(grand + "e+2") + "e-2"));
                }
            }
        }
    });
    roundToTwo(sum);
});