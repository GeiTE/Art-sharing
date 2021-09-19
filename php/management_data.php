<?php
    header("Access-Control-Allow-Origin: *");
    include_once('./opensql.php');	//连接进入数据库接口
    //查询入口
    if(!empty($_POST['search_type'])){
        $search_type = $_POST['search_type'];  //查询内容类型如：用户、作品、评论
        switch ($search_type){
            case "datauser_data":
                $array = array();
                $data = "SELECT user_data.id,user_data.user_name,user_data.user_email,user_datails.user_head_portrait,user_datails.user_address,user_datails.user_introduce,user_datails.user_label FROM user_data,user_datails WHERE user_data.user_email = user_datails.user_email";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "user_name" => $row["user_name"],
                            "user_email" => $row["user_email"],
                            "user_head_portrait" => $row["user_head_portrait"],
                            "user_address" => $row["user_address"],
                            "user_introduce" => $row["user_introduce"],
                            "user_label" => $row["user_label"]
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;

            case "check_data":
                $array = array();
                $data = "SELECT * FROM data_sheet_tbr";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "works_id" => $row["works_id"],
                            "works_name" => $row["works_name"],
                            "user_email" => $row["user_email"],
                            "works_introduce" => $row["works_introduce"],
                            "works_datails" => $row["works_datails"],
                            "works_label" => $row["works_label"],
                            "submitsion_time" => $row["submitsion_time"]
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;
            case "works_pass":
                if(!empty($_POST["user_email"]) && !empty($_POST['works_name']) && !empty($_POST['works_id'])){
                    //对作品数据库进行访问，查看内部数据量
                    // $data = "SELECT * FROM data_sheet";
                    // opensql($data);
                    // $id = $result->num_rows;
                    // $id++;
                    $user_email = $_POST["user_email"];
                    $works_name = $_POST["works_name"];
                    $works_id = $_POST["works_id"];
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
                    
                    //添加发布时间
                    $structure_name =  $structure_name.",release_time";
                    $structure_value = $structure_value.",now()";

                    $data = "INSERT INTO data_sheet (".$structure_name.") VALUES (".$structure_value.")";
                    //echo $data;
                    opensql($data);	//连接数据库
                    if($rc != -1){	//表示已修改
                        //将待审核图片移动到作品文件夹中
                        rename("../images/reviewed_img/".$works_id.".jpg","../images/gallery_img/".$works_id.".jpg");
                        rename("../images/reviewed_img/".$works_id."_small.jpg","../images/gallery_img_small/".$works_id."_small.jpg");
                        echo $works_id;
                        
                    }else{
                        echo 0;
                    }
                }
            break;
            case 'works_remove':
                if(!empty($_POST['works_id'])){
                    $works_id = $_POST['works_id'];
                    $data = "DELETE FROM data_sheet_tbr WHERE works_id = '{$works_id}'";
                    opensql($data);
                    if($rc != -1){	//表示已修改
                        echo 1;
                    }else{
                        echo 0;
                    }
                }
            break;
            case 'works_data':
                $array = array();
                $data = "SELECT * FROM data_sheet";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "works_id" => $row["works_id"],
                            "works_name" => $row["works_name"],
                            "user_email" => $row["user_email"],
                            "works_introduce" => $row["works_introduce"],
                            "works_datails" => $row["works_datails"],
                            "works_label" => $row["works_label"],
                            "release_time" => $row["release_time"]
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;
            case 'index_data':
                //获取用户、作品数
                $user_number = "";
                $works_number = "";
                $array = array();
                $data = "SELECT * FROM data_sheet";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                $works_number = $result->num_rows;
                $data = "SELECT * FROM user_data";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                $user_number = $result->num_rows;
                $array['user_number'] = $user_number;
                $array['works_number'] = $works_number;
                echo json_encode($array);
            break;
            case 'works_data_delete':
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
            case 'check_data_delete':
                if(!empty($_POST['works_id'])){
                    $works_id = $_POST['works_id'];
                    $data = "DELETE FROM data_sheet_tbr WHERE works_id = '{$works_id}'";
                    opensql($data);
                    if($rc != -1){	//表示已修改
                        if(unlink("../images/reviewed_img/".$works_id.".jpg") && unlink("../images/reviewed_img/".$works_id."_small.jpg")){
                            echo 1;
                        }else{
                            echo 0;
                        }
                    }else{
                        echo 0;
                    }
                }
            break;
            case 'delete_user':
                if(!empty($_POST['delete_user_email'])){
                    $data_sheet_if = 0;
                    $data_sheet_tbr_if = 0;
                    $delete_user_email = $_POST['delete_user_email'];
                    //查询发布的作品id，并将对应的图片文件删除
                    $data = "SELECT works_id FROM data_sheet WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                        while($row = $result->fetch_array()){
                            echo $row['works_id']."<br/>";
                            if(unlink("../images/gallery_img/".$row["works_id"].".jpg") && unlink("../images/gallery_img_small/".$row["works_id"]."_small.jpg")){
                                $data_sheet_if++;
                            }
                        }
                        echo $result->num_rows;
                        if($data_sheet_if == $result->num_rows){
                            $data_sheet_if = 1;
                        }else{
                            $data_sheet_if = 0;
                        }
                    }else{
                        $data_sheet_if = 1;
                    }
                    $data = "SELECT works_id FROM data_sheet_tbr WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                        while($row = $result->fetch_array()){
                            if(unlink("../images/reviewed_img/".$row["works_id"].".jpg") && unlink("../images/reviewed_img/".$row["works_id"]."_small.jpg")){
                                $data_sheet_tbr_if++;
                            }
                            echo $row['works_id']."<br/>";
                        }
                        echo $result->num_rows;
                        if($data_sheet_tbr_if == $result->num_rows){
                            $data_sheet_tbr_if = 1;
                        }else{
                            $data_sheet_tbr_if = 0;
                        }
                    }else{
                        $data_sheet_tbr_if = 1;
                    }
                    $head_name = substr($delete_user_email,0,strrpos($delete_user_email,".")).(".jpg");
                    if(file_exists("../images/user_head_portrait/".$head_name)){
                        unlink("../images/user_head_portrait/".$head_name);
                    }
                    $data = "DELETE FROM user_data WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    $data = "DELETE FROM user_datails WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    $data = "DELETE FROM data_sheet WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    $data = "DELETE FROM data_sheet_tbr WHERE user_email = '{$delete_user_email}'";
                    opensql($data);
                    $data = "DELETE FROM comment_data_sheet WHERE comment_email = '{$delete_user_email}'";
                    opensql($data);
                    if($data_sheet_if == 1 && $data_sheet_tbr_if == 1){
                        echo 1;
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