$(function(){
    //获取进入的图片代号
    var works_show_works_id = sessionStorage["works_show_works_id"];
    if(works_show_works_id){
        //根据作品代码查询所有数据
        var search_type = "worksshow_data";
        var works_id = works_show_works_id;
        $.ajax({
            type : "post",
            url : "./php/works_data.php",
            data : {"search_type":search_type,"works_id":works_id},
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
    }else{
        location.replace(".index.html");
    }
    function works_show(data){
        $("#works_user>div>img").attr("src","./images/user_head_portrait/"+data[0]['user_head_portrait']);
        $("#works_user>div>p").text(data[0]["user_name"]);
        $("#exampleModal8 #exampleModalLabel").text(data[0]['works_name']);
        $("#works_user").attr("user",data[0]['user_email']);
        $("#worksshow>figure>img").attr("src","./images/gallery_img_small/"+data[0]['works_id']+"_small.jpg");
        $("#worksshow>figure>figcaption").text(data[0]['works_name']);
        $("#works_img").attr("src","./images/gallery_img/"+data[0]['works_id']+".jpg");
        if(data[0]['works_datails'] != "null" && data[0]['works_datails'] !=  ""){
            var works_datails_array = JSON.parse(data[0]['works_datails']);
            for(var i in works_datails_array){
                $("#works_datails").append(`
                    <div class="col-4"><p style="font-size: 13px;" class="text-black-50">`+works_datails_array[i]['title']+`</p><p>`+works_datails_array[i]['content']+`</p></div>
                `);
            }
        }
        if(data[0]['works_introduce'] != "null" && data[0]['works_introduce'] != ""){
            $("#works_introduce").append(`
                <p>`+data[0]['works_introduce']+`</p>
            `);
        }
        if(data[0]['works_label'] != "null" && data[0]['works_label'] != ""){
            var works_label_array = JSON.parse(data[0]['works_label']);
            for(var j in works_label_array){
                $("#works_label").append(`
                <button class="btn btn-sm btn-outline-dark">`+works_label_array[j]['content']+`</button>
                `);
            }
        }
    }
    $("#works_user").on("click",function(){
        var href_user = $(this).attr("user");
        sessionStorage.setItem("homepage_href_user_email",href_user);
        location.replace("./homepage.html");
    });
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal8'), {
        keyboard: false
    })
    $("#works-small-img").on("click",function(){

        myModal.show();
    })
})