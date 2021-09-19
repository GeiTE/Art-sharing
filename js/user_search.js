$(function(){
    if($.cookie('number') && $.cookie('user_email') && $.cookie('user_name')){
        if($.cookie('number') == 233){
            var head_portrait_base64 = "";
            $(".user_login").addClass("d-none");
            $(".user_join").addClass("d-none");
            $("ul.navbar-nav").append(`
            <div class="nav-item dropdown">
                <a class="nav-link me-4 dropdown-toggle" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">`+$.cookie('user_name')+`</a>
                <ul class="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton1">
                <li><a id="homepage-href" class="dropdown-item" href="./homepage.html">个人主页</a></li>
                <li><a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#exampleModal5">修改个人信息</a></li>
                <li><a id="user-break" class="dropdown-item" href="#">退出登录</a></li>
                </ul>
            </div>
            `);
            $("body").append(`
            <!-- Modal -->
                <div class="modal fade" id="exampleModal5" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">用户信息完善</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">简介</label>
                            <textarea class="form-control" id="modify-introduce" rows="3"></textarea>
                            </div>
                            <div class="mb-3">
                            <label for="modify-address" class="form-label">地址</label>
                            <input type="text" class="form-control" id="modify-address">
                            </div>
                            <div class="mb-3">
                            <label class="form-label">头像</label>
                            <div class="input-group">
                                <input type="file" class="form-control" id="modify-head-portrait" aria-describedby="inputGroupFileAddon04" aria-label="Upload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                            </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button id="btn-dismiss" type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
                        <button id="btn-submit" type="button" class="btn btn-primary">确定</button>
                    </div>
                    </div>
                </div>
                </div>\
            `);
            $("#homepage-href").on("click",function(){
                sessionStorage.setItem("homepage_href_user_email",$.cookie('user_email'));
                //个人的按钮点击之后，将个人的邮箱传输给个人主页。个人主页将按照传输过去的邮箱来显示该邮箱的用户数据。
            });
            $("#user-break").on("click",function(){//退出登录，删除cookie中的数据同时后刷新网页
                $.removeCookie('user_name');
                $.removeCookie('user_email');
                $.removeCookie('number');
                localStorage.removeItem("user_label");
                localStorage.removeItem("user_address");
                localStorage.removeItem("user_introduce");
                localStorage.removeItem("user_head_portrait");
                sessionStorage.removeItem("homepage_href_user_email");
                window.location.reload();
                setTimeout(send,2000);
                function send(){
                    location.replace("./index.html");
                }
            });

            $("#modify-introduce").on("blur",function(){
                if($("#modify-introduce").val() == ""){
                    if(!$("#modify-introduce").attr("required")){
                        $("#modify-introduce").addClass("is-invalid").attr({
                            "aria-describedby" : "validationServer03Feedback",
                            "required":"",
                            "kong":"1"
                        }).after(`
                        <div id="validationServer03Feedback" class="invalid-feedback">
                                                未填写简介，系统将默认简介为空
                        </div>
                        `);
                    }
                }else{
                    if($("#modify-introduce").attr("required")){
                        $("#modify-introduce").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").remove("kong");
                        $("#validationServer03Feedback").remove();
                    }
                }
            });
            $("#modify-address").on("blur",function(){
                if($("#modify-address").val() == ""){
                    if(!$("#modify-address").attr("required")){
                        $("#modify-address").addClass("is-invalid").attr({
                            "aria-describedby" : "validationServer03Feedback",
                            "required":"",
                            "kong":"1"
                        }).after(`
                        <div id="validationServer03Feedback" class="invalid-feedback">
                                                未填写地址，系统将默认简介为空
                        </div>
                        `);
                    }
                }else{
                    if($("#modify-address").attr("required")){
                        $("#modify-address").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").remove("kong");
                        $("#validationServer03Feedback").remove();
                    }
                }
            });
            $("#modify-head-portrait").on("change",function(){
                var  fileDom = this;
                var i = 0;
                if(window.FileReader) {
                    var reader = new FileReader();
                } else {
                    // alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
                    if(!$("#modify-head-portrait").attr("required")){
                        $("#modify-head-portrait").addClass("is-invalid").attr({
                            "aria-describedby" : "validationServer03Feedback",
                            "required":"",
                            "kong":"1"
                        }).after(`
                        <div id="validationServer03Feedback" class="invalid-feedback">
                            您的设备不支持图片预览功能，如需该功能请升级您的设备！    
                        </div>
                        `);
                    }
                }
                //获取文件
                var file = fileDom.files[0];
                var imageType = /^image\//;
                //是否是图片
                if(!imageType.test(file.type)) {
                    if(!$("#modify-head-portrait").attr("required")){
                        $("#modify-head-portrait").addClass("is-invalid").attr({
                            "aria-describedby" : "validationServer03Feedback",
                            "required":"",
                            "kong":"1"
                        }).after(`
                        <div id="validationServer03Feedback" class="invalid-feedback">
                                                请上传图片文件
                        </div>
                        `);
                    }else{
                        if($("#modify-head-portrait").attr("required")){
                        $("#modify-head-portrait").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").remove("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    }
                return;
                }
                //读取完成
                reader.onload = function(e) {
                //图片路径设置为读取的图片
                    var base64img = e.target.result;
                    compress(base64img)//执行压缩
                };
                reader.readAsDataURL(file);
            })
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
                    head_portrait_base64 = newBase64;
                    
                    //压缩后预览
                    if($("#head-portrait")){
                        $("#head-portrait").remove();
                    }
                    $("#modify-head-portrait").parent().after(`
                    <div id="head-portrait-2" class="overflow-hidden mt-3" style="height:200px;width:200px;">
                        <img src="`+newBase64+`" class="img-thumbnail" alt="..." style="max-height:200px; max-width:200px;">
                    </div>
                    `);
                }
            }
            // $("#btn-dismiss").on("click",function(){
            // });
            $("#btn-submit").on("click",function(){
                var user_introduce = "";
                var user_address = "";
                if($("#modify-introduce").val() == ""){
                    user_introduce = null;
                }else{
                    user_introduce = $("#modify-introduce").val();
                }
                if($("#modify-address").val() == ""){
                    user_address = null;
                }else{
                    user_address = $("#modify-address").val();
                }
                
                var search_type = "user_datails";
                $.ajax({
                    type: "post",
                    url: "./php/data_upload.php",
                    data: {'search_type':search_type,'user_address':user_address,'user_introduce':user_introduce,'head_portrait_base64':head_portrait_base64},
                    dataType: 'json',
                    async: true, //默认是true：异步，false：同步。
                    success: function (data) {
                        if(data == 1){
                            window.location.reload();
                        }else{
                            alert("系统出错");
                        }
                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });
        }
    }else{
        $("#btn-workssubmit").attr("title","请登录之后使用此功能");
    }
    //上传功能
    $("#btn-workssubmit").on("click",function(){
        if($.cookie('number') && $.cookie('user_email') && $.cookie('user_name')){
            location.replace("./workssubmit.html");
        }else{
            alert("您未进行登录，请登录后再进行作品上传");
            location.replace("./login.html");
        }
    })
    //在线绘画功能
    $("#btn-canvas").on("click",function(){
        if(IsMobile() == true) {
            alert("在线绘画暂不支持移动端操作");
        }else{
            location.replace("./Canvas.html");
        }
    })
    function IsMobile() {
		var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i) ? true : false;
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i) ? true : false;
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i) ? true : false;
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS()
				|| isMobile.Windows());
			}
		};
        return isMobile.any(); //是移动设备
    }
})