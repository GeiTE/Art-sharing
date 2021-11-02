$(function(){
    $("#admin_username").on("blur",function(){
        if($("#admin_username").val() == ""){      //如果邮箱为空
            if($("#admin_username").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#admin_username").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#admin_username").attr("required")){
                $("#admin_username").addClass("is-invalid").attr({
                    "aria-describedby" : "validationServer03Feedback",
                    "required":"",
                    "kong":"1"
                }).after(`
                <div id="validationServer03Feedback" class="invalid-feedback">
                                        用户名不能为空
                </div>
                `);
            }
        }else{  //如果邮箱不为空
            if($("#admin_username").attr("required")){      //如果存在提示红字则移除样式和提示
                $("#admin_username").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = /^[\u0391-\uFFE5A-Za-z\d]+$/;  //用户验证正则表达式
            var admin_username = $("#admin_username").val();
            var regex_if = regex.test(admin_username);  //验证后传值
            if(regex_if == true){   //用户名格式合格
                if($("#admin_username").attr("required")){
                    $("#admin_username").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#admin_username").attr("required")){
                    if($("#admin_username").attr("kong")){
                        $("#admin_username").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#admin_username").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            用户名格式错误
                    </div>
                    `);
                }
            }
        }
    });

    $("#admin_password").on("blur",function(){
        //密码的要求就是不能够是少于8个字符，不能够是中文。
        if($("#admin_password").val() == ""){      //如果密码为空
            if($("#admin_password").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#admin_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#admin_password").attr("required")){
                $("#admin_password").addClass("is-invalid").attr({
                    "aria-describedby" : "validationServer03Feedback",
                    "required":"",
                    "kong":"1"
                }).after(`
                <div id="validationServer03Feedback" class="invalid-feedback">
                                        密码不能为空
                </div>
                `);
            }
        }else{
            if($("#admin_password").attr("required")){
                $("#admin_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = 8;
            var admin_password = $("#admin_password").val();
            var regex_if = admin_password.length >= regex;  //验证后传值
            if(regex_if == true){   //密码格式合格
                if($("#admin_password").attr("required")){
                    $("#admin_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#admin_password").attr("required")){
                    if($("#admin_password").attr("kong")){
                        $("#admin_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#admin_password").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            密码不能少于8个字符
                    </div>
                    `);//不对特殊字符做管束，因为特殊字符可以增加密码的难度，form表单的admin_password自动的就不可以输入汉字作为密码.
                }
            }
        }
    });
    $("#login").on("click",function(){
        var admin_username = $("#admin_username").val();
        var admin_password = $("#admin_password").val();
        var user_if = !$("#admin_username").attr("required");
        var pass_if = !$("#admin_password").attr("required");
        if(admin_username != "" && admin_password != ""){
            if(user_if && pass_if){
                admin_password = hex_md5($("#admin_password").val());
                admin_login_search(admin_username,admin_password);
            }
        }
    });

    function admin_login_search(admin_username,admin_password){
        var search_type = "admin_login_search";
        $.ajax({
            type : "POST",
            url : "../../php/search.php",
            data : {'search_type':search_type,'admin_password':admin_password,'admin_username':admin_username},
            async:  true,   //异步
            dataType : "json", 
            success : function(data){
                switch (data.number){
                    case 233:
                        //跳转登录页面
                            //给浏览器传入cookie值
                            $.cookie( "admin_number", data.number, { expires:10, path : "/" } );
                            $.cookie( "admin_username", data.admin_username, { expires:10, path : "/" } );
                            if($("div.alert")){
                                $("div.alert").remove();
                            }
                            setTimeout(send,1000);
                            function send(){
                                location.replace("./dataindex.html");
                            }
                    break;
                    case -1:
                        if($("div.alert")){
                            $("div.alert").remove();
                        }
                        $("body").prepend(`
                            <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fa 1 show" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                <div>
                                网站出现问题，请重试
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        `);
                    break;
                    case 222:
                        if($("div.alert")){
                            $("div.alert").remove();
                        }
                        $("body").prepend(`
                            <div class="alert alert-warning d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                <div>
                                用户或者密码错误
                                </div>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>
                        `);
                    break;
                }
            },
            error : function(){
                if($("div.alert")){
                    $("div.alert").remove();
                }
                $("body").prepend(`
                    <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        <div>
                        网站出现问题，请重试。
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                `);
            }
        })
    }
})