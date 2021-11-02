$(function(){
    var url = decodeURI(window.location .href);
    var check_numer = url.indexOf('=');
    if(check_numer>-1){
        url = url.substring(check_numer+1);
        $("#ssk").val(url);
        $("#search_content").text(url);
        //查询相关作品数据
        var search_type = "search_data";
        var search_content = url;
        $.ajax({
            type : "post",
            url : "../../php/search.php",
            data : {"search_type":search_type,"search_content":search_content},
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
                            <img src="../../images/user_head_portrait/`+data[i]['user_head_portrait']+`" alt="">
                            <span>`+data[i]['user_name']+`</span>
                        </div>
                        <img src="../../images/gallery_img_small/`+data[i]['works_id']+`_small.jpg" class="card-img-top" alt="..." works="`+data[i]['works_id']+`">
                    </div>
                </div>
            `);
        }
        $("#works_title").text("作品 "+data.length);
        $("#works_view>.row").imagesLoaded(function(){
            $("body").append(`
                <script src="../../js/plugins/masonry.pkgd.min.js"></script>
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
        window.location = "./homepage.html";
    });
    $(".card-bg-black").on('click',function(){
        console.log(1);
        var href_user = $(this).attr("works");
        sessionStorage.setItem("works_show_works_id",href_user);
        window.location = "./worksshow.html"; 
    })
    $(".card-img-top").on('click',function(){
        console.log(1);
        var href_user = $(this).attr("works");
        sessionStorage.setItem("works_show_works_id",href_user);
        window.location = "./worksshow.html";
    })
})