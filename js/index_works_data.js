$(function(){
    //获取作品表中的所有数据
    //需要获取作品名、作品代号、用户邮箱、用户姓名
    //用户点击之后，再获取作品的全部信息
    var search_type = "index_works_data";
    $.ajax({
        type : "post",
        url : "./php/works_data.php",
        data : {"search_type":search_type},
        dataType : "json",
        async : false,
        success : function(data){
            if(data['user_auth'] == "null"){
                $("#works_view>div").append(`
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
    //作品数据
    function works_show(data){
        for(var i=0;i<data.length;i++){
            var id = i;
            id++;
            $("#works_view>div").append(`
                <div class="col-sm-6 col-lg-4 mb-4 gird-item" style="position: absolute; left: 0%; top: 0px;" number="`+id+`">
                    <div class="card">
                        <div class="card-bg-black" works="`+data[i]['works_id']+`"></div>
                        <div class="user" user="`+data[i]['user_email']+`">
                            <img src="./images/user_head_portrait/`+data[i]['user_head_portrait']+`" alt="">
                            <span>`+data[i]['user_name']+`</span>
                        </div>
                        <img src="./images/gallery_img_small/`+data[i]['works_id']+`_small.jpg" class="card-img-top" alt="..." works="`+data[i]['works_id']+`">
                    </div>
                </div>
            `);
        }
        $("#works_title").text(data.length);
        $("#works_view>div").imagesLoaded(function(){
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
})