$(document).ready(()=>{
    //Input Files
    let inputFile = document.getElementById("file");
    let inputText = document.getElementById("file_input");
    inputFile.addEventListener("change", ()=>{
        if(inputFile.value){
            inputText.innerHTML = inputFile.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else{
            inputText.innerHTML = "No choosen file, yet *";
        }
    });
    let inputFile_2 = document.getElementById("file_2");
    let inputText_2 = document.getElementById("file_input_2");
    inputFile_2.addEventListener("change", ()=>{
        if(inputFile_2.value){
            inputText_2.innerHTML = inputFile_2.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else{
            inputText_2.innerHTML = "No choosen file, yet";
        }
    });
    let inputFile_3 = document.getElementById("file_3");
    let inputText_3 = document.getElementById("file_input_3");
    inputFile_3.addEventListener("change", ()=>{
        if(inputFile_3.value){
            inputText_3.innerHTML = inputFile_3.value.match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1];
        } else{
            inputText_3.innerHTML = "No choosen file, yet";
        }
    });
    //Input Checkbox
    let i = 1;
    let input_text_box = document.getElementById("isActive");
    $('.check_label').bind('click', ()=>{
        i *= -1;
        if(i == -1){
            $('.check_label').removeClass("btn-outline-success");
            $('.check_label').addClass("btn-outline-danger");
            $('.check_label').text("IS MISSING");
            input_text_box.value="off";
        }else{
            $('.check_label').removeClass("btn-outline-danger");
            $('.check_label').addClass("btn-outline-success");
            $('.check_label').text("IN STOCK");
            input_text_box.value="on";
        }
    });
    let h = 1;
    let input_hot = document.getElementById("Hot");
    $('.check_label_2').bind('click', ()=>{
        h *= -1;
        if(h == -1){
            $('.check_label_2').css("background", "red");
            $('.check_label_2').css("color", "#fff");
            input_hot.value="on";
        }else{
            $('.check_label_2').css("background", "transparent");
            $('.check_label_2').css("color", "red");
            input_hot.value="off";
        }
    });
    let New = 1;
    let input_new = document.getElementById("New");
    $('.check_label_3').bind('click', ()=>{
        New *= -1;
        if(New == -1){
            $('.check_label_3').css("background", "blue");
            $('.check_label_3').css("color", "#fff");
            input_new.value="on";
        }else{
            $('.check_label_3').css("background", "transparent");
            $('.check_label_3').css("color", "#7bc8d0");
            input_new.value="off";
        }
    });
    let Sale = 1;
    let input_sale = document.getElementById("Sale");
    $('.check_label_4').bind('click', ()=>{
        Sale *= -1;
        if(Sale == -1){
            $('.check_label_4').css("background", "green");
            $('.check_label_4').css("color", "#fff");
            input_sale.value="on";
        }else{
            $('.check_label_4').css("background", "transparent");
            $('.check_label_4').css("color", "green");
            input_sale.value="off";
        }
    });
    //Input Color
    let c = 1;
    $(".add_color").bind("click", ()=>{
        if(c <= 3){
            $("<div class='form-group'><input type='color' name=color_"+c+" class='form-control form-control-color mr-2 color_"+c+"' id='color'></div>").prependTo('.colors_row');
            c++;
        }
    });
    $(".delete_color").bind("click", ()=>{
        if(c > 1){
            c --;
            $(".color_"+c+"").css("display", "none");
        } 
    });
    //Input Sizes
    let os = 1;
    let input_size_os = document.getElementById("os");
    $(".oslabel").bind('click', ()=>{
        os *= -1;
        if(os == -1){
            $(".oslabel").css("color", "#18f4a0");
            input_size_os.value="on";

        }else{
            $(".oslabel").css("color", "#e33350");
            input_size_os.value="off";
        }
    });let xs = 1;
    let input_size_xs = document.getElementById("xs");
    $(".xslabel").bind('click', ()=>{
        xs *= -1;
        if(xs == -1){
            $(".xslabel").css("color", "#18f4a0");
            input_size_xs.value="on";

        }else{
            $(".xslabel").css("color", "#e33350");
            input_size_xs.value="off";
        }
    });let s = 1;
    let input_size_s = document.getElementById("s");
    $(".slabel").bind('click', ()=>{
        s *= -1;
        if(s == -1){
            $(".slabel").css("color", "#18f4a0");
            input_size_s.value="on";

        }else{
            $(".slabel").css("color", "#e33350");
            input_size_s.value="off";
        }
    });let m = 1;
    let input_size_m = document.getElementById("m");
    $(".mlabel").bind('click', ()=>{
        m *= -1;
        if(m == -1){
            $(".mlabel").css("color", "#18f4a0");
            input_size_m.value="on";

        }else{
            $(".mlabel").css("color", "#e33350");
            input_size_m.value="off";
        }
    });let l = 1;
    let input_size_l = document.getElementById("l");
    $(".llabel").bind('click', ()=>{
        l *= -1;
        if(l == -1){
            $(".llabel").css("color", "#18f4a0");
            input_size_l.value="on";

        }else{
            $(".llabel").css("color", "#e33350");
            input_size_l.value="off";
        }
    });let xl = 1;
    let input_size_xl = document.getElementById("xl");
    $(".xllabel").bind('click', ()=>{
        xl *= -1;
        if(xl == -1){
            $(".xllabel").css("color", "#18f4a0");
            input_size_xl.value="on";

        }else{
            $(".xllabel").css("color", "#e33350");
            input_size_xl.value="off";
        }
    });let xxl = 1;
    let input_size_xxl = document.getElementById("xxl");
    $(".xxllabel").bind('click', ()=>{
        xxl *= -1;
        if(xxl == -1){
            $(".xxllabel").css("color", "#18f4a0");
            input_size_xxl.value="on";

        }else{
            $(".xxllabel").css("color", "#e33350");
            input_size_xxl.value="off";
        }
    });
});