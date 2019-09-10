!(function(){
    let phonereg= /^1[356789]\d{9}$/;
    let passreg= /^.{6,16}$/;
    let phoneflag=false;
    let passflag=false;
    let repassflag=false;
    //手机号
    //得到焦点
    $('#pemail').on('focus',function(){
        if ($(this).val() == '') {
           $('.msg-phone').html('请输入一个正确的手机号码') ;
            $('.msg-phone').css({'color':'#999'});
           phoneflag = false;
        };
    });
    //失去焦点
    $('#pemail').on('blur',function(){
        if(phonereg.test( $(this).val())){
            $('.msg_box-1 em').css({'display':'block'});
            $('.msg-phone').html('')
            phoneflag = true;
        }else{
            $('.msg_box-1 em').css({'display':'none'});
            $('.msg-phone').html('手机号码格式不正确') ;
            $('.msg-phone').css({'color':'red'});
            phoneflag = false;
        }
    });
    //密码
    //得到焦点
    $('#password').on('focus',function(){
        if ($(this).val() == '') {
           $('.msg-pass').html('请输入一个6-16位密码');
            $('.msg-pass').css({'color':'#999'});
           passflag = false;
        };
    });
    //失去焦点
     $('#password').on('blur',function(){
        if(passreg.test( $(this).val())){
            $('.msg_box-2 em').css({'display':'block'});
            $('.msg-pass').html('')
            passflag = true;
        }else{
            $('.msg_box-2 em').css({'display':'none'});
            $('.msg-pass').html('密码为空或格式不正确') ;
            $('.msg-pass').css({'color':'red'});
            passflag = false;
        }
    });
     //确认密码
     //得到焦点
     $('#password2').on('focus',function(){
        if ($(this).val() == '') {
           $('.msg-repass').html('再次输入密码') ;
            $('.msg-repass').css({'color':'#999'});
            repassflag = false;
        };
    });
     //失去焦点
     $('#password2').on('blur',function(){
        if($(this).val()===$('#password').val() && $('#password').val()!==''){
            $('.msg_box-3 em').css({'display':'block'});
            $('.msg-repass').html('')
            repassflag = true;
        }else{
            $('.msg_box-3 em').css({'display':'none'});
            $('.msg-repass').html('两次密码要一致') ;
            $('.msg-repass').css({'color':'red'});
            repassflag = false;
        }
    });
    //点击提交 regflag为true提交到数据库
    $('#reg_submit').on('click',function(){
        
        if(phoneflag && passflag && repassflag){
           
          $.ajax({
              type: "post",
              url: "http://10.31.157.77/800/php/register.php",
              data:{
                username: $('#pemail').val(),
                password: $('#password').val(),
              },
              success: function (d) {
                $('#reg_submit').attr({'href':'http://10.31.157.77/800/dist/login.html'})
              }
          });
         
        }
    })

    //验证手机号码是否存在
    $('#pemail').on('blur',function(){
       $.ajax({
           type:'post',
            url:'http://10.31.157.77/800/php/register.php',
            data:{//给后端
                checkname:$('#pemail').val()
            },
            success:function(d){
                 console.log(d)
                if(!d){
                    if(phonereg.test( $('#pemail').val())){
                        $('.msg_box-1 em').css({'display':'block'});
                        $('.msg-phone').html('')
                        phoneflag = true;
                    }else{
                        $('.msg_box-1 em').css({'display':'none'});
                        $('.msg-phone').html('手机号码格式不正确') ;
                        $('.msg-phone').css({'color':'red'});
                        phoneflag = false;
                    }
                }else{
                    $('.msg_box-1 em').css({'display':'none'});
                    $('.msg-phone').html('手机号码已存在') ;
                    $('.msg-phone').css({'color':'red'});
                    phoneflag = false;
                }
            }
        })
    });

})();