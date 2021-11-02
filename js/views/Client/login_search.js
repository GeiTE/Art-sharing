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
    $("#submit").on("click",function(){
        var user_email = $("#user_email").val();
        var user_password = $("#user_password").val();
        var user_email_if =  !$("#user_email").attr("required");
        var user_password_if = !$("#user_password").attr("required");
        if(user_email != "" && user_password != ""){
            if(user_email_if && user_password_if){
                user_password = hex_md5($("#user_password").val());
                login_search(user_email,user_password);
            }
        }  
    })

    function login_search(user_email,user_password){
        var search_type = "login_search";
        $.ajax({
            type : "POST",
            url : "../../php/search.php",
            data : {'search_type':search_type,'user_password':user_password,'user_email':user_email},
            async:  false,   //异步
            dataType : "json", 
            success : function(data){
                switch (data.number){
                    case 233:
                        //跳转登录页面
                            //给浏览器传入cookie值
                            $.cookie( "number", data.number, { expires : 7, path : '/' } );
                            $.cookie( "user_name", data.user_name, { expires : 7, path : '/' } );
                            $.cookie( "user_email", data.user_email, { expires : 7, path : '/' } );
                            localStorage.setItem("user_head_portrait",data.user_head_portrait);
                            localStorage.setItem("user_address",data.user_address);
                            localStorage.setItem("user_introduce",data.user_introduce);
                            localStorage.setItem("user_label",data.user_label);
                            if($("div.alert")){
                                $("div.alert").remove();
                            }
                            setTimeout(send,1000);
                            function send(){
                                location.replace("./index.html");
                            }
                    break;
                    case -1:
                        if($("div.alert")){
                            $("div.alert").remove();
                        }
                        $(".container-fluid").prepend(`
                            <div class="alert alert-danger d-flex align-items-center fixed-top alert-dismissible fade show" role="alert">
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
                        $(".container-fluid").prepend(`
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
        })
    }
})