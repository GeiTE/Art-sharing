<?php
	header("Access-Control-Allow-Origin: *");
	include_once('./opensql.php');	//连接进入数据库接口
	function user_join($user_name,$user_email,$user_password){
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
	
?>