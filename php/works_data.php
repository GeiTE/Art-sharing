<?php
    header("Access-Control-Allow-Origin: *");
    include_once('./opensql.php');	//连接进入数据库接口
    //查询入口
    if(!empty($_POST['search_type'])){
        $search_type = $_POST['search_type'];  //查询内容类型如：用户、作品、评论
        switch ($search_type){
            case "index_works_data":
                $array = array();
                $data = "SELECT data_sheet.works_id,user_data.user_name,user_data.user_email,user_datails.user_head_portrait FROM data_sheet,user_data,user_datails WHERE data_sheet.user_email = user_datails.user_email AND data_sheet.user_email = user_data.user_email";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "works_id" => $row["works_id"],
                            "user_name" => $row["user_name"],
                            "user_email" => $row["user_email"],
                            "user_head_portrait" => $row["user_head_portrait"],
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;
            case "worksshow_data":
                $works_id = $_POST['works_id'];
                $array = array();
                $data = "SELECT data_sheet.works_id,data_sheet.works_name,data_sheet.works_introduce,data_sheet.works_datails,data_sheet.works_label,user_data.user_name,user_data.user_email,user_datails.user_head_portrait FROM data_sheet,user_data,user_datails WHERE data_sheet.works_id = '{$works_id}' AND data_sheet.user_email = user_datails.user_email AND data_sheet.user_email = user_data.user_email";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据

                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "works_id" => $row["works_id"],
                            "works_name" => $row["works_name"],
                            "works_introduce" => $row["works_introduce"],
                            "works_datails" => $row["works_datails"],
                            "works_label" => $row["works_label"],
                            "user_name" => $row["user_name"],
                            "user_email" => $row["user_email"],
                            "user_head_portrait" => $row["user_head_portrait"],
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;
            case "comment_data":
                $works_id = $_POST['works_id'];
                $array = array();
                $data = "SELECT comment_data_sheet.comment_email,comment_data_sheet.comment_content,comment_data_sheet.comment_time,user_datails.user_name,user_datails.user_head_portrait FROM comment_data_sheet,user_datails WHERE comment_data_sheet.comment_works_id = '{$works_id}' AND comment_data_sheet.comment_email = user_datails.user_email ORDER BY comment_data_sheet.id DESC";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($result->num_rows >0){	//如果数据大于0，表示查询到数据
                    while($row = $result->fetch_array()){
                        $array[] = array(
                            "comment_email" => $row["comment_email"],
                            "comment_content" => $row["comment_content"],
                            "comment_time" => $row["comment_time"],
                            "user_name" => $row["user_name"],
                            "user_head_portrait" => $row["user_head_portrait"]
                        );
                    }
                }else{
                    $array = array("user_auth"=>"null");
                }
                echo json_encode($array);
            break;
            case "comment_submit":
                $comment_works_id = $_POST['comment_works_id'];
                $comment_email = $_POST['comment_email'];
                $comment_content = $_POST['comment_content'];
                $array = array();
                $data = "INSERT INTO comment_data_sheet (comment_works_id,comment_email,comment_content,comment_time) VALUES ('{$comment_works_id}','{$comment_email}','{$comment_content}',now())";	//查询该用户的具体信息;
                opensql($data);	//连接数据库
                if($rc == -1){
                    echo 0;
                }else{
                    echo 1;
                }
            break;
            default:
            echo 0;
        }
    }
?>