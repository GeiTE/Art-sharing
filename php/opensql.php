<?php
    //数据库连接接口
    function opensql($data){
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "art_sharing";
        $con = mysqli_connect($servername,$username,$password,$dbname);
        mysqli_query($con,"set names 'utf8'");
        if (mysqli_connect_error()) {
            echo "没有连接上！";
            return;
        }
        $sql = $data;
        $GLOBALS['result'] = mysqli_query($con,$sql);   //设置全局变量$result
        $GLOBALS['rc'] = mysqli_affected_rows($con);

        mysqli_close($con);
    }

?>