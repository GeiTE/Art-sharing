<?php
    // header("Access-Control-Allow-Origin: *");
    header('Content-Type:text/html;charset=utf-8');
    include_once('./opensql.php');	//连接进入数据库接口
    // include_once('./user_join.php');    //用户注册接口
    //查询入口
    if(!empty($_POST['search_type'])){
        $search_type = $_POST['search_type'];  //查询内容类型如：用户、作品、评论
        switch ($search_type){
            case "search_data":
                $array = array();
                if(!empty($_POST['search_content'])){
                    $search_content = $_POST['search_content'];
                    //对作品数据进行模糊查询
                    function utf8_strlen($string = null) {  //中文字符数
                        // 将字符串分解为单元
                        preg_match_all("/./us", $string, $match);
                        // 返回单元个数
                        return count($match[0]);
                    }
                    for($j=0;$j<utf8_strlen($search_content);$j++){
                        $search_kied = mb_substr($search_content,$j,1);
                        opensql("ALTER TABLE 'Test' DEFAULT CHARACTER SET utf8");
                        $data = "SELECT data_sheet.works_id,data_sheet.works_name,data_sheet.user_email,user_datails.user_name,user_datails.user_head_portrait FROM data_sheet,user_datails WHERE data_sheet.works_name LIKE '%{$search_kied}%' AND data_sheet.user_email = user_datails.user_email";
                        opensql($data);//对每个字符都进行模糊查询
                        $check = 0;
                        if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                            while($row = $result->fetch_array()){
                                //判断是否有重复的作品
                                foreach($array as $value){
                                    if($row['works_id'] == $value['works_id']){
                                        $check++;
                                    }
                                }
                                if($check == 0){
                                    $array[] = array(
                                        "works_id" => $row["works_id"],
                                        "works_name" => $row["works_name"],
                                        "user_name" => $row["user_name"],
                                        "user_email" => $row["user_email"],
                                        "user_head_portrait" => $row["user_head_portrait"],
                                    );
                                }else{
                                    $check = 0;
                                }
                            }
                        }
                    }
                    if(isset($array) == null){
                        $array = array("user_auth"=>"null");
                    }
                    echo json_encode($array);
                }
            break;
            case "homepage_works":
                $array = array();
                if(!empty($_POST['href_user_email'])){
                    $href_user_email = $_POST['href_user_email'];
                    $data = "SELECT data_sheet.works_id,data_sheet.works_name,data_sheet.user_email,user_datails.user_name,user_datails.user_head_portrait FROM data_sheet,user_datails WHERE data_sheet.user_email LIKE '{$href_user_email}' AND data_sheet.user_email = user_datails.user_email";
                    opensql($data);
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                        while($row = $result->fetch_array()){
                            $array[] = array(
                                "works_id" => $row["works_id"],
                                "works_name" => $row["works_name"],
                                "user_name" => $row["user_name"],
                                "user_email" => $row["user_email"],
                                "user_head_portrait" => $row["user_head_portrait"],
                            );
                        }
                    }else{
                        $array = array("user_auth"=>"null");
                    }
                    echo json_encode($array);
                }
            break;
            case "join_search":
                if(!empty($_POST['user_name']) && !empty($_POST['user_email']) && !empty($_POST['user_password'])){
                    $user_name = $_POST['user_name'];
                    $user_email = $_POST['user_email'];
                    $user_password = $_POST['user_password'];
                    // user_join($user_name,$user_email,$user_password);
                    $return_nunber = 0;
                    $user_password = md5($user_password);	//给密码进行二次md5加密
                    $data = "SELECT user_email  FROM user_data WHERE user_email = '{$user_email}'";	//查询数据库中是否有相同的邮箱;
                    opensql($data);	//连接数据库
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                        $return_nunber = 221;
                        echo $return_nunber; //该邮箱已经注册过了
                    }else{
                        //该邮箱没有注册，可以继续验证用户名是否重复
                        $data = "SELECT user_name  FROM user_data WHERE user_name = '{$user_name}'";	//查询数据库中是否有相同的邮箱;
                        opensql($data);	//连接数据库
                        if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                            $return_nunber = 222;
                            echo $return_nunber; //该邮箱没有注册过，但是名字重复
                        }else{
                            //邮箱和名字都没有问题。
                            //将数据加入到数据库
                            $data = "SELECT * FROM user_data";
                            opensql($data);
                            $id = $result->num_rows;
                            $id++;
                            $data = "INSERT INTO user_data (id,user_name,user_password,user_email) VALUES ('{$id}','{$user_name}','{$user_password}','{$user_email}')";
                            opensql($data);	//连接数据库
                            $data = "SELECT * FROM user_datails";
                            opensql($data);
                            $id = $result->num_rows;
                            $id++;
                            $data = "INSERT INTO user_datails(id,user_name,user_email) VALUES ('{$id}','{$user_name}','{$user_email}')";
                            opensql($data);
                            if($rc == -1){
                                $return_nunber = -1;
                                echo $return_nunber;
                            }else{
                                $return_nunber = 233;
                                echo $return_nunber;
                            }
                        }
                    }
                }
            break;
            case "login_search":
                if(!empty($_POST['user_email']) && !empty($_POST['user_password'])){
                    $user_email = $_POST['user_email'];
                    $user_password = $_POST['user_password'];
                    $arr = array(
                        'number' => "",
                        'user_name' => "",
                        'user_email' => "", 
                        'user_head_portrait' => "",
                        'user_address' => "",
                        'user_introduce' => "",
                        'user_label' => ""
                    );
                    // $return_nunber = 0;
                    $user_password_md5 = md5($user_password);	//给密码进行二次md5加密
                    $data = "SELECT user_name,user_email,user_password  FROM user_data WHERE user_email = '{$user_email}' AND user_password = '{$user_password_md5}'";	//查询数据库中是否有相同的邮箱;
                    opensql($data);	//连接数据库
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                        //对登录进行一次记录
                        $data = "SELECT * FROM user_signin_data";
                        opensql($data);
                        $id = $result->num_rows;    //user_signin_data的数据数量
                        $id++;
                        $data = "INSERT INTO user_signin_data (id,user_email,signin_time) VALUES ('{$id}','{$user_email}',now())";
                        opensql($data);	//连接数据库
                        if($rc == -1){
                            $arr['number'] = -1;
                        }else{
                            $arr['number'] = 233;
                            $data = "SELECT *  FROM user_datails WHERE user_email = '{$user_email}'";	//查询该用户的具体信息;
                            opensql($data);	//连接数据库
                            $row = mysqli_fetch_assoc($result);
                            if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                                $arr['user_name'] = $row['user_name'];
                                $arr['user_email'] = $row['user_email'];
                                $arr['user_head_portrait'] = $row['user_head_portrait'];
                                $arr['user_address'] = $row['user_address'];
                                $arr['user_introduce'] = $row['user_introduce'];
                                $arr['user_label'] = $row['user_label'];
                            }
                        }
                    }else{
                        //账号或密码错误，需要重新输入
                        $arr['number'] = 222;
                        //账号或者错误，没有查询到数据
                    }
                    echo json_encode($arr);
                }
            break;
            case "homepage_data":
                if(!empty($_POST['user_email'])){
                    $user_email = $_POST['user_email'];
                    $arr = array(
                        'user_name' => "",
                        'user_email' => "",
                        'user_head_portrait' => "",
                        'user_address' => "",
                        'user_introduce' => "",
                        'user_label' => ""
                    );
                    $data = "SELECT *  FROM user_datails WHERE user_email = '{$user_email}'";	//查询该用户的具体信息;
                    opensql($data);	//连接数据库
                    $row = mysqli_fetch_assoc($result);
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                        $arr['user_name'] = $row['user_name'];
                        $arr['user_email'] = $row['user_email'];
                        $arr['user_head_portrait'] = $row['user_head_portrait'];
                        $arr['user_address'] = $row['user_address'];
                        $arr['user_introduce'] = $row['user_introduce'];
                        $arr['user_label'] = $row['user_label'];
                    }
                    echo json_encode($arr);
                }
            break;

            case "admin_login_search":
                if(!empty($_POST['admin_username']) && !empty($_POST['admin_password'])){
                    $admin_username = $_POST['admin_username'];
                    $admin_password = $_POST['admin_password'];
                    $arr = array(
                        'number' => "",
                        'admin_username' => "",
                    );
                    // $return_nunber = 0;
                    $admin_password_md5 = md5($admin_password);	//给密码进行二次md5加密
                    $data = "SELECT *  FROM admin_user WHERE admin_username = '{$admin_username}' AND admin_password = '{$admin_password_md5}'";	//查询数据库中是否有相同的邮箱;
                    opensql($data);	//连接数据库
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                        //对登录进行一次记录
                        $data = "SELECT * FROM admin_signin_data";
                        opensql($data);
                        $id = $result->num_rows;    //admin_signin_data的数据数量
                        $id++;
                        $data = "INSERT INTO admin_signin_data (id,admin_username,signin_time) VALUES ('{$id}','{$admin_username}',now())";
                        opensql($data);	//连接数据库
                        if($rc == -1){
                            $arr['number'] = -1;
                        }else{
                            $arr['number'] = 233;
                            $arr['admin_username'] = $admin_username;
                        }
                    }else{
                        //账号或密码错误，需要重新输入
                        $arr['number'] = 222;
                        //账号或者错误，没有查询到数据
                    }
                    echo json_encode($arr);
                }
            break;
            case "homepage_data_delete":
                if(!empty($_POST['works_id'])){
                    $works_id = $_POST['works_id'];
                    $data = "DELETE FROM data_sheet WHERE works_id = '{$works_id}'";
                    opensql($data);
                    if($rc != -1){	//表示已修改
                        if(unlink("../images/gallery_img/".$works_id.".jpg") && unlink("../images/gallery_img_small/".$works_id."_small.jpg")){
                            echo 1;
                        }else{
                            echo 0;
                        }
                    }else{
                        echo 0;
                    }
                }
            break;
            default:
            echo 0;
        }
    }
?>