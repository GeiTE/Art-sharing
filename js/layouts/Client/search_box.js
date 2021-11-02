$(function(){
    $("#ssan").on("click",function(){
        if($("#ssk").val() == ""){
            $("#ssk").attr("placeholder","未填写内容");
        }else{
            var val = $("#ssk").val();
            window.location = "./search.html?search="+val+"";
        }
    })
})