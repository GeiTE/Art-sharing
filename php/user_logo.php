<?php
	include_once('openSQL.php');	//连接进入数据库接口

	if(!empty($_POST['admin_username']) && !empty($_POST['admin_password'])){	//判断值是否为空（即是否传过来）
		$admin_username = $_POST['admin_username'];
		$admin_password = $_POST['admin_password'];
		// $array = array("user_auth"=>1,"admin_username"=>$admin_username,"admin_password"=>$admin_password);
		$data = "SELECT * FROM admin_user WHERE admin_username='{$admin_username}' AND admin_password='{$admin_password}'";	//查询数据库中是否有相对于的用户名和密码
		opensql($data);	//连接数据库

		if($result->num_rows >0){	//如果数据大于0，表示查询到数据
			//输出数据
			while($row = $result->fetch_assoc()){
				$array = array("user_auth"=>1,"admin_username"=>$row["admin_username"]);
				// echo "<br/>admin_id:".$row["admin_id"]."<br/>admin_username:".$row["admin_username"]."<br/>admin_password:".$row["admin_password"];
			}
		}
		else{
			$array = array("user_auth"=>0);
			// echo "没有查询到内容！";
		}

		$str = json_encode($array);
		echo $str;

		mysqli_free_result($result);	//释放数据库
	}
?>