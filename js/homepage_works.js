$(function(){
    var href_user_email = sessionStorage['homepage_href_user_email'];
    console.log(href_user_email);
    if(href_user_email != ""){
        //查询相关作品数据
        var search_type = "homepage_works";
        $.ajax({
            type : "post",
            url : "./php/search.php",
            data : {"search_type":search_type,"href_user_email":href_user_email},
            dataType : "json",
            async : false,
            success : function(data){
                if(data['user_auth'] == "null"){
                    $("#works_view").append(`
                        <div class="text-center my-5">无作品数据</div>
                    `);
                }else{
                    console.log(data);
                    works_show(data);
                }
            },
            error : function(){
                alert("网站出现错误");
            }
        })
    }
    function works_show(data){
        for(var i=0;i<data.length;i++){
            var id = i;
            id++;
            $("#works_view>.row").append(`
                <div class="col-sm-6 col-lg-4 mb-4" style="position: absolute; left: 0%; top: 0px;" number="`+id+`">
                    <div class="card">
                        <div class="card-bg-black" works="`+data[i]['works_id']+`"></div>
                        <div class="user" user="`+data[i]['user_email']+`">
                            <img src="./images/user_head_portrait/`+data[i]['user_head_portrait']+`" alt="">
                            <span>`+data[i]['user_name']+`</span>
                        </div>
                        <div class="user-btn">
                            <button type="button" class="btn btn-light delete d-none">删除</button>
                        </div>
                        <img src="./images/gallery_img_small/`+data[i]['works_id']+`_small.jpg" class="card-img-top" alt="..." works="`+data[i]['works_id']+`">
                    </div>
                </div>
            `);
        }
        $("#works_title").text("作品 "+data.length);
        $("#works_view>.row").imagesLoaded(function(){
            $("body").append(`
                <script src="./js/masonry.pkgd.min.js"></script>
            `);
            $('.grid').masonry({
                // options...
                itemSelector: '.grid-item',
                columnWidth: 200
            });
        })
    }
    $(".user").on('click',function(){
        console.log(1);
        var href_user = $(this).attr("user");
        sessionStorage.setItem("homepage_href_user_email",href_user);
        location.replace("./homepage.html");
    });
    $(".card-bg-black").on('click',function(){
        console.log(1);
        var href_user = $(this).attr("works");
        sessionStorage.setItem("works_show_works_id",href_user);
        location.replace("./worksshow.html");
    })
    $(".card-img-top").on('click',function(){
        console.log(1);
        var href_user = $(this).attr("works");
        sessionStorage.setItem("works_show_works_id",href_user);
        location.replace("./worksshow.html");
    })
    var homepage_href_user_email = sessionStorage["homepage_href_user_email"];
    if(homepage_href_user_email == $.cookie('user_email')){
        //这个是自己进入自己的个人主页
        //能够进行个人信息的修改
        $(".user").addClass('d-none');
        $(".delete").removeClass('d-none');
        $(".delete").on("click",function(){
            var works_id =  $(this).parent().siblings(".card-bg-black").attr("works");
            var search_type = "homepage_data_delete";
            console.log(works_id);
            $.ajax({
                type: "post",
                url: "./php/search.php",
                data: {'search_type':search_type,'works_id':works_id},
                dataType: 'json',
                async: false, //默认是true：异步，false：同步。
                success: function (data) {
                    if(data == 1){
                        window.location.reload();
                    }
                },
                error: function (data) {
                    alert("网站出现错误，将刷新");
                    // window.location.reload();
                }
            });
        })
    }
})