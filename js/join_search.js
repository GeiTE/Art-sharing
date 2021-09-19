$(function(){
    $("#user_email").on("blur",function(){
        if($("#user_email").val() == ""){      //如果邮箱为空
            if($("#user_email").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#user_email").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#user_email").attr("required")){
                $("#user_email").addClass("is-invalid").attr({
                    "aria-describedby" : "validationServer03Feedback",
                    "required":"",
                    "kong":"1"
                }).after(`
                <div id="validationServer03Feedback" class="invalid-feedback">
                                        邮箱不能为空
                </div>
                `);
            }
        }else{  //如果邮箱不为空
            if($("#user_email").attr("required")){      //如果存在提示红字则移除样式和提示
                $("#user_email").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;  //邮箱验证正则表达式
            var user_email = $("#user_email").val();
            var regex_if = regex.test(user_email);  //验证后传值
            if(regex_if == true){   //邮箱格式合格
                if($("#user_email").attr("required")){
                    $("#user_email").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#user_email").attr("required")){
                    if($("#user_email").attr("kong")){
                        $("#user_email").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#user_email").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            邮箱格式错误
                    </div>
                    `);
                }
            }
        }
    });
    $("#user_name").on("blur",function(){
        if($("#user_name").val() == ""){      //如果用户名为空
            if($("#user_name").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#user_name").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#user_name").attr("required")){
                $("#user_name").addClass("is-invalid").attr({
                    "aria-describedby" : "validationServer03Feedback",
                    "required":"",
                    "kong":"1"
                }).after(`
                <div id="validationServer03Feedback" class="invalid-feedback">
                                        用户名不能为空
                </div>
                `);
            }
        }else{
            if($("#user_name").attr("required")){
                $("#user_name").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = /^[\u0391-\uFFE5A-Za-z\d]+$/;
            var user_name = $("#user_name").val();
            var regex_if = regex.test(user_name);  //验证后传值
            if(regex_if == true){   //用户名格式合格
                if($("#user_name").attr("required")){
                    $("#user_name").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#user_name").attr("required")){
                    if($("#user_name").attr("kong")){
                        $("#user_name").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#user_name").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            用户名必须是汉字、英文、数字
                    </div>
                    `);//在这个基础之上，然后就是用户名的重名。之后通过与数据库的用户名对比。
                }
            }
        }
    });
    $("#user_password").on("blur",function(){
        //密码的要求就是不能够是少于8个字符，不能够是中文。
        if($("#user_password").val() == ""){      //如果密码为空
            if($("#user_password").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#user_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#user_password").attr("required")){
                $("#user_password").addClass("is-invalid").attr({
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
            if($("#user_password").attr("required")){
                $("#user_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = 8;
            var user_password = $("#user_password").val();
            var regex_if = user_password.length >= regex;  //验证后传值
            if(regex_if == true){   //密码格式合格
                if($("#user_password").attr("required")){
                    $("#user_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#user_password").attr("required")){
                    if($("#user_password").attr("kong")){
                        $("#user_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#user_password").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            密码不能少于8个字符
                    </div>
                    `);//不对特殊字符做管束，因为特殊字符可以增加密码的难度，form表单的password自动的就不可以输入汉字作为密码.
                }
            }
        }
    })
    $("#check_password").on("blur",function(){
        //判断与格式正确的密码相同即可
        if($("#check_password").val() == ""){      //如果密码为空
            if($("#check_password").attr("gscw")){  //如果有警告格式不正确，就移除掉
                  $("#check_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("gscw");
                  $("#validationServer03Feedback").remove();
            }
            if(!$("#check_password").attr("required")){
                $("#check_password").addClass("is-invalid").attr({
                    "aria-describedby" : "validationServer03Feedback",
                    "required":"",
                    "kong":"1"
                }).after(`
                <div id="validationServer03Feedback" class="invalid-feedback">
                                        密码确认不能为空
                </div>
                `);
            }
        }else{
            if($("#check_password").attr("required")){
                $("#check_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required");
                $("#validationServer03Feedback").remove();
            }
            var regex = $("#user_password").val();
            var check_password = $("#check_password").val();
            var regex_if = check_password == regex;  //验证后传值
            if(regex_if == true){   //密码格式合格
                if($("#check_password").attr("required")){
                    $("#check_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                    $("#validationServer03Feedback").remove();
                }
            }
            if(regex_if == false){
                if(!$("#check_password").attr("required")){
                    if($("#check_password").attr("kong")){
                        $("#check_password").removeClass("is-invalid").removeAttr("aria-describedby").removeAttr("required").removeAttr("kong");
                        $("#validationServer03Feedback").remove();
                    }
                    $("#check_password").addClass("is-invalid").attr({
                        "aria-describedby" : "validationServer03Feedback",
                        "required":"",
                        "gscw":"2"
                    }).after(`
                    <div id="validationServer03Feedback" class="invalid-feedback">
                                            密码未审核通过或密码不相符
                    </div>
                    `);
                }
            }
        }
    })
    
    $("#submit").on("click",function(){
        var user_email = $("#user_email").val();
        var user_name = $("#user_name").val();
        var user_password = $("#user_password").val();
        var check_password = $("#check_password").val();
        var user_email_if =  !$("#user_email").attr("required");
        var user_name_if = !$("#user_name").attr("required");
        var user_password_if = !$("#user_password").attr("required");
        var check_password_if = !$("#check_password").attr("required");
        if(user_email != "" && user_name != "" && user_password != "" && check_password != ""){
            if(user_email_if && user_name_if && user_password_if && check_password_if){
                var user_email = $("#user_email").val();
                var user_name = $("#user_name").val();
                var user_password = hex_md5($("#user_password").val());
                var check_password = hex_md5($("#check_password").val());
                var search_type = "join_search";
                $.ajax({
                    type : "POST",
                    url : "./php/search.php",
                    data : {'search_type':search_type,'user_name':user_name,'user_password':user_password,'user_email':user_email},
                    async:  true,   //异步
                    dataType : "json", 
                    success : function(data){
                        switch (data){
                            case 221:
                                if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-warning d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                        邮箱已被注册.
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
                            break;
                            case 222:
                                if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-warning d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                        用户名已被使用.
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
                            break;
                            case 233:
                                //跳转登录页面
                                if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-success d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
                                        <div>
                                        恭喜你加入我们.
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
                                //给浏览器传入cookie值
                                // $.cookie("user_name",user_name,{expires:10});
                                // $.cookie("user_password",user_password,{expires:10});
                                
                                // setTimeout(send,2000);
                                // function send(){
                                //     location.replace("./login.html");
                                // }
                            break;
                            case -1:
                                if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                        网站出现问题，请重试。
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
                            break;
                        }
                    },
                    error:function(){
                        if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                        网站出现问题，请重试。
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
                    }
                });
            }else{
                if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-warning d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                        还有信息未通过.
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
            }
        }else{
            if($("div.alert")){
                                    $("div.alert").remove();
                                }
                                $(".container-fluid").prepend(`
                                    <div class="alert alert-warning d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
                                        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                        <div>
                                            还有信息未填写.
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                    </div>
                                `);
        }
    }) 
})