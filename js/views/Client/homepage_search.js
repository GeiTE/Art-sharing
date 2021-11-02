$(function(){
    //通过头像的连带用户名，来显示个人主要显示的内容，然后在通过正在登陆的用户比较是否是这个人的主页，来判断是否显示编辑功能。
    var homepage_href_user_email = sessionStorage["homepage_href_user_email"];
    if(homepage_href_user_email){
        if(homepage_href_user_email == $.cookie('user_email')){
            //这个是自己进入自己的个人主页
            //能够进行个人信息的修改
            
        }
        //连接数据库，获取该用户的信息，以及作品信息。
        var search_type = "homepage_data";
        $.ajax({
            type : "POST",
            url : "../../php/search.php",
            data : {'search_type':search_type,'user_email':homepage_href_user_email},
            async : false,
            dataType : "json",
            success : function(data){
                $("#user-head-portrait").css("background-image","url(../../images/user_head_portrait/"+data.user_head_portrait+")");
                $("#user-name").text(data.user_name);
                $("#user-email").html(`
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope me-2" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
                </svg>
                `+ data.user_email
                );
                if(data.user_address != "" && data.user_address != "null"){
                    $("#user-name").after(`
                    <p id="user-address" class="text-black-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt me-2" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    `+data.user_address+`</p>
                    `);
                }
                if(data.user_introduce != "" && data.user_introduce != "null"){
                    $("#user-name").after(`
                    <p id="user-introduce" class="mb-3 text-break">`+data.user_introduce+`</p>
                    `);
                }
                if(data.user_label !="" && data.user_label != "null"){
                    var arr = data.user_label.split("/");
                    var arrlen = arr.length;
                    //user_label 为数组数据，将每个标签遍历出来。
                    for(var i=0;i<arrlen;i++){
                        $("#user-label").append(`
                        <button class="btn btn-sm">`+arr[i]+`</button>
                        `);
                    }
                }else{
                    $("#user-label").html(`
                        <p class="fw-light">无标签</p>
                    `);
                }
                
            },
            error : function(){

            }
        })
    }else{
        //没有信息，直接进入个人网页的，跳转主页面
        location.replace("./index.html");
    }
})