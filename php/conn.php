<?php
header('content-type:text/html;charset=utf-8');//设置字符编码
define('HOST','localhost');//本地主机
define('NAME','root');//数据库的用户名
define('PASSWORD','');//数据库的密码
define('DBNAME','z800'); //数据库名称
$conn=@new mysqli(HOST,NAME,PASSWORD,DBNAME);
if($conn->connect_error){
    die('数据库连接失败'.$conn->connect_error);//结束并输出里面的内容
}
$conn->query("SET NAMES UTF8");//不加网页上的中文会变？？？？？


