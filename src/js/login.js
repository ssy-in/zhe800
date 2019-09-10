$(document).ready(function () {
//点击登录跳转主页
$('.header').load("../dist/header.html");
$('.login-btn').on('click',function(){
    
    $.ajax({
         type:'post',
         url:'http://10.31.157.77/800/php/login.php',
         data:{
             user:$('.login-input1').val(),
             pass:$('.login-input2').val()
         },
         success:function(d){
             if(!d){
                 alert('用户名和密码错误');
             }else{
                 alert('登录成功');
                 location.href='http://10.31.157.77/800/dist/';
             }
            
         }
     });
 })
});

