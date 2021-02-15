$(document).ready(()=>{
   if($("#country").val() == 0){
       $(".btn-info").css("pointer-events", "none");
       $(".btn-info").addClass("disabled");
   }
    else{
        $(".btn-info").css("pointer-events", "auto");
        $(".btn-info").removeClass("disabled");
    }
   $("#country").bind("change", ()=>{
       if($("#country").val() == 0){
            $(".btn-info").css("pointer-events", "none");
            $(".btn-info").addClass("disabled");
        }
       else{
           $(".btn-info").css("pointer-events", "auto");
            $(".btn-info").removeClass("disabled");
       }
   });
});