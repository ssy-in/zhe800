<?php

require "conn.php";
    $user=$_POST['user'];
    $pass=$_POST['pass'];


    $result=$conn->query("select * from usertable where phone='$user' and pass='$pass'");
    
    if($result->fetch_assoc()){
        echo true;
    }
    else{
        echo false;
    }
