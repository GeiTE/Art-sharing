$(function(){
   if($.cookie('admin_number') == 233 && $.cookie('admin_username')){
        $("#admin-username").text($.cookie('admin_username'));
        $("#admin-break").on("click",function(){
            $.removeCookie( 'admin_number', { path : '/' } );
            $.removeCookie( 'admin_username', { path : '/' });
            setTimeout(send,1000);
            function send(){
                location.replace("./adminlogin.html");
            }
        })
   }else{
        location.replace("./404.html");
   }
})