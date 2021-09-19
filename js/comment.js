$(function(){
    //评论功能
    //获取该作品的评论信息
    var works_show_works_id = sessionStorage["works_show_works_id"];
    if(works_show_works_id){
        var search_type = "comment_data";
        var works_id = works_show_works_id;
        $.ajax({
            type : "post",
            url : "./php/works_data.php",
            data : {"search_type":search_type,"works_id":works_id},
            dataType : "json",
            async : false,
            success : function(data){
                if(data['user_auth'] == "null"){
                    $("#pinglunneirong").append(`
                        <div class="text-center my-5">暂无评论</div>
                    `);
                }else{
                    console.log(data);
                    comment_show(data);
                }
            },
            error : function(){
                alert("网站出现错误");
            }
        })
        function comment_show(data){
            for(var i=0;i<data.length;i++){
                $("#pinglunneirong").append(`
                    <div class="row plys border-top">
                        <div class="col-auto col-lg-1">
                            <img src="./images/user_head_portrait/`+data[i]['user_head_portrait']+`" alt="" style="width: 60px;height: 60px;" class=" rounded-pill float-start mt-2 comment_user"  user="`+data[i]['comment_email']+`">
                        </div>
                        <div class="col">
                            <p class="username mt-2" style="font-size: 14px;">`+data[i]['user_name']+`</p>
                            <p class="pinglun">`+data[i]['comment_content']+`</p>
                            <p class="time text-black-50">`+data[i]['comment_time']+`</p>
                        </div>
                    </div>
                `);
            }
            $("#pinglunneirong").append(`
                <div class="row plys border-top text-center">
                    <p class="mt-2">到底咯~</p>
                </div>
            `);
            $("#comment_number").text(data.length);
        }
        if($.cookie('user_email')){ //是否有用户登录
            //获取用户自己的头像和用户名
            if($("#pinlun").children("div").hasClass('d-none')){
                $("#pinlun").children().removeClass('d-none');
            }
            $("#pinlun>div img").attr("src","./images/user_head_portrait/"+localStorage['user_head_portrait']);
        }else{
            //禁止数据评论
            $("#pinlun").children().addClass("d-none");
            $("#pinlun").append(`
                <div class="text-center text-danger mb-5">请登录后进行评论</div>
            `);
        }
        $("#comment_submit").on("click",function(){
            if($("#comment_content").val() == ""){
                $("#pinlun").prepend(`
                    <div class="alert alert-primary alert-dismissible" role="alert" id="liveAlert">
                        <strong>未填写</strong> 请输入后提交.
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
            }else{
                if($("#liveAlert").html()){
                    $("#liveAlert").remove();
                }
                $("#pinglunneirong").children().remove();
                //将数据提交到数据库
                var search_type = "comment_submit";
                var comment_works_id = works_show_works_id;
                var comment_email = $.cookie('user_email');
                var comment_content = $("#comment_content").val();
                $.ajax({
                    type : "post",
                    url : "./php/works_data.php",
                    data : {"search_type":search_type,"comment_works_id":comment_works_id,"comment_email":comment_email,"comment_content":comment_content},
                    dataType : "json",
                    async : true,
                    success : function(data){
                        if(data == 1){
                           window.location.reload();
                        }
                    },
                    error : function(){
                        alert("网站出现错误");
                    }
                })
            }
        })
        $(".comment_user").on("click",function(){
            var homepage_href_user_email = $(this).attr('user');
            sessionStorage.setItem('homepage_href_user_email',homepage_href_user_email);
            location.replace("./homepage.html");
        })        
    }
})