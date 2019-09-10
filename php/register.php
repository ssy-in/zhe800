<?php

require "conn.php";

//检测用户名
if(isset($_POST['checkname'])){
    $username=$_POST['checkname'];
    //通过查询方式来测试是否存在用户名。
    $result=$conn->query("select * from usertable where phone='$username'");

    if($result->fetch_assoc()){//存在
        echo true;//1
    }else{//不存在
        echo false;//空隙
    }

}


//前端用户点击了submit按钮。接收前端传入表单的值。
if(isset($_POST['username']) && isset($_POST['password'])){
    $name=$_POST['username'];
    $pass=$_POST['password'];//加密
    //添加数据库
    $conn->query("insert usertable values(null,'$name','$pass',NOW())");
}  