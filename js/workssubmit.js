$(function(){
    var homepage_href_user_email = sessionStorage["homepage_href_user_email"];
    if($.cookie('number') && $.cookie('user_email') && $.cookie('user_name')){
        //详细信息的按钮数据联动
    $("#works-datails>div.col-md-4>div.my-3>div.input-group>ul>li>a").on("click",function(){
        var val = $(this).text();
        $(this).parents("ul").siblings("input").attr("value",val);
    });
    var works_img = "";         //原质量的图片base64
    var works_img_compress = "";    //压缩的图片base64
    var json_data = {   //作品数据提交
        "works_name" : "",      //作品名
        "works_introduce" : "",     //作品介绍
        "works_datails" : "",       //作品详情
        "works_label" : "",         //作品标签
        "works_image" : "",          //作品图片数据
        "works_image_small" : ""       //作品图片缩略图
    };
    $("#works-img").on("change",function(e){
        var  fileDom = this;
        if(!fileDom.files[0]){
            //取消上传，则上传文件的长度为0
            //之前有图片数据的删除图片数据
                $("#file-box").css("background-image","");
        }else{
            if(window.FileReader) {
                var reader = new FileReader();
            } else {
                // alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
                if(!$("#works-img").attr("required")){
                    $("#works-img").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "kong":"1"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                        您的设备不支持图片预览功能，如需该功能请升级您的设备！    
                    </div>
                    `);
                }else{
                    if($("#works-img").attr("required")){
                        $("#works-img").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").remove("kong");
                        $("#validationServer03Feedback").remove();
                    }
                }
            }
            //获取文件
            var file = fileDom.files[0];
            var imageType = /^image\//;
            //是否是图片
            if(!imageType.test(file.type)) {
                if(!$("#works-img").attr("required")){
                    $("#works-img").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "kong":"1"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            请上传图片文件
                    </div>
                    `);
                }
            return;
            }else{
                if($("#works-img").attr("required")){
                    $("#works-img").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").remove("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            //读取完成
            reader.onload = function(e) {
            //图片路径设置为读取的图片
                var base64img = e.target.result;
                works_img = base64img;
                json_data['works_image'] = base64img;
                compress(base64img);//执行压缩
            };
            reader.readAsDataURL(file);
        }
    });
    function compress(base64Img) {
        var bili = 0.7;//压缩后的图片尺寸,0.7就是70%
        var quality = 0.7;//压缩后图片的质量,数字越小图片越模糊
        var img = new Image();//创建一个空白图片对象
        img.src = base64Img;//图片对象添加图片地址
        img.onload = function () {//图片地址加载完后执行操作
            var newWidth = img.width*bili;//压缩后图片的宽度
            var newHeight = img.height*bili;//压缩后图片的高度
    
            //开始画压缩图
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            canvas.width = newWidth;//压缩图的宽度
            canvas.height = newHeight;//压缩图的高度
            ctx.drawImage(img,0,0,newWidth,newHeight);
            var newBase64 = canvas.toDataURL("image/jpeg",quality);
            works_img_compress = newBase64;
            json_data['works_image_small'] = newBase64;
            
            //压缩后预览
            // if($("#head-portrait")){
            //     $("#head-portrait").remove();
            // }
            // $("#works-img").parent().after(`
            // <div id="head-portrait-2" class="overflow-hidden mt-3" style="height:200px;width:200px;">
            //     <img src="`+newBase64+`" class="img-thumbnail" alt="..." style="max-height:200px; max-width:200px;">
            // </div>
            // `);
            if($("#file-box").css("background-image")){
                $("#file-box").css("background-image","");
            }
            $("#file-box").css("background-image","url("+newBase64+")");
            $("#works-img-box>svg,#works-img-box>p").remove();
            $("#exampleModal2 .modal-body figure img").attr("src",newBase64);
        }
    }
    //预览作品
    $("#works-img-show").on("click",function(){
        var works_datails_json = {};   //详情数据对象
        if($("#works-title").val() != "" && $("#works-img").val() != "" && !$("#works-img").attr("required")){
            $(".alert-dismissible").remove();
            $("#preview-workname").text($("#works-title").val());
            if($("#works-introduce").val() != ""){
                if($(".preview-jianjie").hasClass("d-none")){
                    $(".preview-jianjie").removeClass("d-none");
                }
                if($(".preview-jianjie>span").text() != ""){
                    $(".preview-jianjie>span").remove();
                }
                $(".preview-jianjie").append("<span>"+$("#works-introduce").val()+"</span>");
            }else{
                $(".preview-jianjie").addClass("d-none");
            }
            if(Object.keys(works_label_json).length !== 0){
                if($(".preview-label").hasClass("d-none")){
                    $(".preview-label").removeClass("d-none");
                }
                if($("#exampleModal2 .modal-body>.container>.row>#preview-label>button")){
                    $("#exampleModal2 .modal-body>.container>.row>#preview-label>button").remove();
                }
                for(var p in works_label_json){
                    $("#exampleModal2 .modal-body>.container>.row>#preview-label").append(`
                        <button class="btn btn-outline-secondary me-2"><small>`+works_label_json[p]['content']+`</button>
                    `);
                }
            }else{
                    $(".preview-label").addClass("d-none");
            }
            for(var i=0;i<5;i++){
                var input = $("#works-datails>div.col-md-4:eq("+i+")>div.my-3>div.input-group>input");
                if(input.val() != ""){
                    var key_name = input.attr("name");
                    var title =  $("#works-datails div.col-md-4:eq("+i+") label").text();
                    var content = input.val();
                    works_datails_json[key_name] = {
                        'title' : title,
                        'content' : content 
                    };
                }
            }
            if(Object.keys(works_datails_json).length !== 0){
                if($("#preview-datails").hasClass("d-none")){
                    $("#preview-datails").removeClass("d-none");
                }
                if($("#exampleModal2 .modal-body>.container>.row>#preview-datails>span")){
                    $("#exampleModal2 .modal-body>.container>.row>#preview-datails>span").remove();
                }
                for(var p in works_datails_json){
                    $("#exampleModal2 .modal-body>.container>.row>#preview-datails").append(`
                        <span class="me-2"><small>`+works_datails_json[p]['title']+`</small>:`+works_datails_json[p]['content']+`</span>
                    `);
                }
            }else{
                $("#preview-datails").addClass("d-none");
            }
            $("#exampleModal2").modal('show');
            
        }else{
            $("body>.container-fluid").prepend(`
                <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert" style="margin-top:55px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                    请至少同时上传作品图片和填写作品名称。
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);
        }
    });
    //标签分类的数据联动
    var works_label_json = {};  //标签数据
    $("#works-label>div.btn-group>ul>li>a").on("click",function(){
        var key = $(this).parents("ul").siblings("button").attr("name");
        var title = $(this).parents("ul").siblings("button").attr("title");
        var content = $(this).text();
        $(this).parents("ul").siblings("button").text(content);
        works_label_json[key] = {
            'title' : title,
            'content' : content 
        };
        if(works_label_json != ""){
            $("#label-show>p>span").remove();
            for(var p in works_label_json){
                $("#label-show>p").append(`
                    <span class="text-primary text-decoration-none me-1">`+works_label_json[p]['title']+`->`+works_label_json[p]['content']+`</span>
                `);
            }
        }
    });

    //作品提交
    $("#works-submit").on("click",function(){
        var works_datails_json = {};   //详情数据对象
        if($("#works-title").val() != "" && $("#works-img").val() != "" && !$("#works-img").attr("required")){
            $(".alert-dismissible").remove();
            json_data['works_name'] = $("#works-title").val();
            if($("#works-introduce").val() != ""){
                json_data['works_introduce'] = $("#works-introduce").val();
            }
            for(var i=0;i<5;i++){
                var input = $("#works-datails>div.col-md-4:eq("+i+")>div.my-3>div.input-group>input");
                if(input.val() != ""){
                    var key_name = input.attr("name");
                    var title =  $("#works-datails div.col-md-4:eq("+i+") label").text();
                    var content = input.val();
                    works_datails_json[key_name] = {
                        'title' : title,
                        'content' : content 
                    };
                }
            }
            if(Object.keys(works_datails_json).length !== 0){
                json_data['works_datails'] = works_datails_json;
            }
            if(Object.keys(works_label_json).length !== 0){
                json_data['works_label'] = works_label_json;
            }
            //console.log(json_data);
            works_submit(json_data);
        }else{
            $("body>.container-fluid").prepend(`
                <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert" style="margin-top:55px">
                    <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                    <div>
                    请至少同时上传作品图片和填写作品名称。
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `);
        }
    });

    function works_submit(json_data){    //作品数据提交
        var works_data = {};  //需要传输的数据
        if(json_data['works_image'] != "" && json_data['works_image_small'] != "" && json_data['works_name'] != ""){
            var search_type = "works_submit";
            works_data = {
                'search_type' : search_type,
                'works_image' : json_data['works_image'],
                'works_image_small' : json_data['works_image_small'],
                'works_name' : json_data['works_name']
            }
            if(json_data['works_introduce'] != ""){
                works_data['works_introduce'] = json_data['works_introduce'];
            }
            if(json_data['works_datails'] != ""){
                works_data['works_datails'] = JSON.stringify(json_data['works_datails']);
            }
            if(json_data['works_label'] != ""){
                works_data['works_label'] = JSON.stringify(json_data['works_label']);
            }
            console.log(works_data);
            //ajax传输数据给后台
            $.ajax({
                type : 'post',
                url: "./php/data_upload.php",
                data : works_data,
                dataType : 'json',
                async : true,
                success:function(data){
                    if(data == 1){
                        alert("提交成功！我们将为您在尽快审核");
                        sessionStorage.setItem("homepage_href_user_email",$.cookie('user_email'));
                        setTimeout(send,2000);
                        function send(){
                            location.replace("./homepage.html");
                        }
                    }else{
                        alert("提交失败!请重试");
                    }
                    
                },
                error:function(data){
                    alert("网站出现问题，请重新打开");
                }
            })
        }
    }
    }else{
        location.replace("./index.html");
    }
    
})