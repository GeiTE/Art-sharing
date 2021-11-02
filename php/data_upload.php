<?php
    // header("Access-Control-Allow-Origin: *");
    include_once('./opensql.php');	//连接进入数据库接口
    if(!empty($_POST['search_type'])){
        $search_type = $_POST['search_type'];  //上传图片类型为头像图片/作品图片
        switch ($search_type){
            case "user_datails":
                if(!empty($_COOKIE["user_email"]) && !empty($_POST["user_address"]) && !empty($_POST["user_introduce"]) && !empty($_POST["head_portrait_base64"])){
                    $user_email = $_COOKIE["user_email"];
                    $user_address = $_POST["user_address"];
                    $user_introduce = $_POST["user_introduce"];
                    $base64 = $_POST['head_portrait_base64'];
                    $base64 = explode(',',$base64);
                    $tmp = base64_decode($base64[1]);//base64解码
                    $portrait_name = substr($user_email,0,strrpos($user_email,".")).(".jpg");
                    $user_hade_floader = "../images/user_head_portrait/";
                    $user_hade_portrait = $user_hade_floader.$portrait_name;
                    //file_put_contents($name,$tmp);//图片写入服务器
                    if(file_put_contents($user_hade_portrait,$tmp)){
                        // echo 1;
                        //echo $name."<br/>".$user_email."<br/>".$user_address."<br/>".$user_introduce;
                        $data = "UPDATE user_datails SET user_head_portrait = '{$portrait_name}', user_address = '{$user_address}', user_introduce = '{$user_introduce}' WHERE user_email = '{$user_email}'";
                        opensql($data);	//连接数据库
                        if($rc != -1){	//表示已修改
                            $data = "SELECT user_head_portrait FROM user_datails WHERE user_email = '{$user_email}'";
                            opensql($data);
                            if($result->num_rows > 0){
                                while($row = $result->fetch_array()){
                                    $array = array( "user_auth" => 1, "user_head_portrait" => $row["user_head_portrait"] );
                                    echo json_encode($array);
                                }
                            } else {
                                echo $array[] = array( "user_auth" => 0 );
                            }


                        }else{
                            echo $array[] = array( "user_auth" => 0 );
                        }
                    }else{
                        echo $array[] = array( "user_auth" => 0 );
                    }
                }
            break;
            case "works_submit":
                if(!empty($_COOKIE["user_email"]) && !empty($_POST['works_name']) && !empty($_POST['works_image']) && !empty($_POST['works_image_small'])){
                    //对作品数据库进行访问，查看内部数据量
                    $data = "SELECT * FROM data_sheet_tbr";
                    opensql($data);
                    $id = $result->num_rows;
                    $id++;
                    $user_email = $_COOKIE["user_email"];
                    $works_name = $_POST["works_name"];
                    $works_id = date("Ymdhis").$id;
                    $works_introduce = "";
                    $works_datails = "";
                    $works_label = "";
                    $structure_name = "works_id,works_name,user_email";
                    $structure_value = "'{$works_id}','{$works_name}','{$user_email}'";
                    //如果有非填内容，判断是否提交，提交则添加相应的sql语句
                    if(!empty($_POST["works_introduce"])){  //介绍内容
                        $works_introduce = $_POST["works_introduce"];
                        $structure_name =  $structure_name.",works_introduce";
                        $structure_value = $structure_value.",'{$works_introduce}'";
                    }
                    if(!empty($_POST["works_datails"])){    //详情json数据
                        $works_datails = $_POST['works_datails'];
                        $structure_name =  $structure_name.",works_datails";
                        $structure_value = $structure_value.",'{$works_datails}'";
                        //echo $works_datails;
                    }
                    if(!empty($_POST["works_label"])){      //标签json数据
                        $works_label = $_POST["works_label"];
                        $structure_name =  $structure_name.",works_label";
                        $structure_value = $structure_value.",'{$works_label}'";
                    }
                    
                    //添加提交时间
                    $structure_name =  $structure_name.",submitsion_time";
                    $structure_value = $structure_value.",now()";

                    $works_image = $_POST['works_image'];
                    $works_image_small = $_POST['works_image_small'];
                    //原图解码
                    $works_image = explode(',',$works_image);
                    $tmp_img = base64_decode($works_image[1]);//base64解码
                    //缩略图解码
                    $works_image_small = explode(',',$works_image_small);
                    $tmp_img_small = base64_decode($works_image_small[1]);//base64解码
                    //图片地址
                    $data_folder = "../images/reviewed_img/";
                    //文件名
                    $name = $works_id.".jpg";    //文件重命名
                    $small_name = $works_id."_small.jpg";
                    //
                    $works_url = $data_folder.$name;
                    $works_small_url = $data_folder.$small_name;
                    if(file_put_contents($works_url ,$tmp_img) && file_put_contents($works_small_url ,$tmp_img_small)){
                        $data = "INSERT INTO data_sheet_tbr (".$structure_name.") VALUES (".$structure_value.")";
                        //echo $data;
                        opensql($data);	//连接数据库
                        if($rc != -1){	//表示已修改
                            echo 1;
                        }else{
                            echo 2;
                        }
                    }else{
                        echo 3;
                    }
                }
            break;
        }
    }
    

?>