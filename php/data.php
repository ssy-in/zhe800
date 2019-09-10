<?php
    header('content-type:text/html;charset=utf-8');
    require "conn.php";//引入数据库连接
    $result=$conn->query("select * from indexdata");
    $arrdata=array();

    for($i=0;$i<$result->num_rows;$i++){
        $arrdata[$i]=$result->fetch_assoc();
    }

    echo json_encode($arrdata);
    
