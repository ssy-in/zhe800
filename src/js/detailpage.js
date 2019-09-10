////详情页
//jq引入头 内容 尾
$(document).ready(function () {
     $('.header').load("../dist/header.html");
    $('.main').load("../dist/detailpage-main.html");
   $('.footer').load("../dist/footer.html");
    let $a=location.search.substring(1).split('=')[1];
    //详情页渲染
    $.ajax({
      data:{
        sid:$a
      },
      type: "post",  //默认get
      url: "http://10.31.157.77/800/php/data-detailpage.php",  //默认当前页
      dataType: "json",

      success: function (d) {  //请求成功回调
        let $cont = $('.deteilpic-xr');
        // console.log(d.)
        //渲染
        $cont.find('.bp').html(`
         <img sid="${d.sid}" src="${d.url}"
         style="display: inline;">
        `);
        $cont.find('.sp').html( `
            <li class="">
               <a href="#">
                <img src="${d.url}" alt="" style="width:58px;height:58px;">
               </a>
            </li>
           `);
        $('.detail-title').html(
          `${d.title}`
        );
        $('.detail-xj').html(
          `¥${d.newprice}`
        );
        $('.detail-yj').html(
          `¥${d.oldprice}`
        );
        //数量加减函数
        quantityjj();




  //cookie
	var arrsid = []; //商品sid
  var arrnum = []; //数量
  //先取
	function cookietoarray() {
		if(getcookie('cookiesid') && getcookie('cookienum')) {//判断商品是第一次存还是多次存储
			arrsid = getcookie('cookiesid').split(','); 
			arrnum = getcookie('cookienum').split(','); 
		}
	}
	//判断商品是否多次。
	$('.add-cart').on('click', function() { //点击加入购物车按钮。
		
		//获取当前的按钮对应的商品的sid
		var $sid = $(this).parents('#detail').find('.bp img').attr('sid');
		cookietoarray();//获取已经存在的cookie值。
		if($.inArray($sid, arrsid) != -1) {//存在数量叠加 
			var num = parseInt(arrnum[$.inArray($sid, arrsid)]) + parseInt($('.sl').find('input').val());
			arrnum[$.inArray($sid, arrsid)] = num;
			addcookie('cookienum', arrnum.toString(), 10); 
		} else { //不存在添加
			arrsid.push($sid); 
			addcookie('cookiesid', arrsid.toString(), 10);
			arrnum.push($('.sl').find('input').val());
			addcookie('cookienum', arrnum.toString(), 10); 
        }
        alert('添加成功');
	});


      },
    });



    //数量的改变 函数 
    function quantityjj() {
      //点击右键++
      $('.jia').on('click', function () {

          var $count = $('#numb').val();//值
          $count++;
          if ($count >= 99) {
              $count = 99;
          }
          $('#numb').val($count);//赋值回去

      });
      //点击左键--
      $('.jian').on('click', function () {


          var $count = $('#numb').val();
          $count--;
          if ($count <= 1) {
              $count = 1;
          }
          $('#numb').val($count);
      
      });
      //输入改变数量
      $('#numb').on('input', function () {
          var $reg = /^\d+$/g; //只能输入数字
          var $value = parseInt($(this).val());
          if ($reg.test($value)) {//是数字
              if ($value >= 99) {//限定范围
                  $(this).val(99);
              } else if ($value <= 0) {
                  $(this).val(1);
              } else {
                  $(this).val($value);
              }
          } else {//不是数字
              $(this).val(1);
          }
          setcookie($(this));
      });







  };
    //放大镜    
  ! function () {
    class magnifying {
        constructor() {
            this.wrap = $('.wrap');
            this.spic = $('#spic'); //小图
            this.sf = $('#sf'); //小放
            this.bf = $('#bf'); //大放
            this.bpic = $('#bpic'); //大图
            this.ullist = $('#list ul');
            this.list = $('#list li'); //10个li
            this.left = $('#left');
            this.right = $('#right');
        }

        init() {
            let _this = this;
            //1.鼠标移入小图，显示小放和大放。移出同理
            this.spic.hover(function () {
                $('#sf,#bf').css('visibility', 'visible');

                //3.鼠标移动，小放跟随
                _this.spic.on('mousemove', function (ev) {
                    _this.spicmove(ev);
                });

            }, function () {
                $('#sf,#bf').css('visibility', 'hidden');
            });

            //2.求小放的尺寸。
            this.sf.css({
                width: this.spic.width() * this.bf.width() / this.bpic.width(),
                height: this.spic.height() * this.bf.height() / this.bpic.height(),
            });
            //4.求比例
            this.bili = this.bpic.width() / this.spic.width();

            //5.给下面的列表li添加点击事件
            this.list.on('click', function () {
                _this.changepicurl($(this));
            });

            //6.给right按钮添加事件
            this.num = 6; //可视的图片长度
            //返回值:eq(index|-index)获取第N个元素
            this.liwidth = this.list.eq(0).outerWidth(); //1个li的宽度

            //长度小于6，无需显示左右按钮
            if (this.list.length <= 6) {
                this.right.css('color', '#fff');
            }

            this.right.on('click', function () {
                _this.rightclick();
            });

            //7.给left按钮添加事件
            this.left.on('click', function () {
                _this.leftclick();
            });
        }
        spicmove(ev) {
            let l = ev.pageX - this.wrap.offset().left - this.sf.width() / 2;
            let t = ev.pageY - this.wrap.offset().top - this.sf.height() / 2;
            if (l < 0) {
                l = 0;
            } else if (l >= this.spic.width() - this.sf.width()) {
                l = this.spic.width() - this.sf.width();
            }
            if (t < 0) {
                t = 0;
            } else if (t >= this.spic.height() - this.sf.height()) {
                t = this.spic.height() - this.sf.height();
            }

            this.sf.css({
                left: l,
                top: t
            });

            this.bpic.css({
                left: -l * this.bili,
                top: -t * this.bili
            })
        }


        changepicurl(obj) {
            let $imgurl = obj.find('img').attr('src');
            this.spic.find('img').attr('src', $imgurl);
            this.bpic.attr('src', $imgurl);
            //切换后重新设置小放的尺寸和比例
            this.sf.css({
                width: this.spic.width() * this.bf.width() / this.bpic.width(),
                height: this.spic.height() * this.bf.height() / this.bpic.height(),
            });
            this.bili = this.bpic.width() / this.spic.width();
        }



    }
    new magnifying().init();
}();

  });




