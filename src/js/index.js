//jq引入头 内容 尾
$(document).ready(function () {
  $('.header').load("../dist/header.html");
  $('.main').load("../dist/main.html");
  $('.footer').load("../dist/footer.html");
  //渲染衣服列表
  $.ajax({
    type: "post",  //默认get
    url: "http://10.31.157.77/800/php/data%20clotheslist.php",  //默认当前页
    dataType: "json",
    success: function (d) {  //请求成功回调
      // console.log(d)
      let $cont = $('.clothes-list');
      // console.log($cont)
      let $str = '';
      $.each(d, function (i, value) {
        $str += `
        <li>
          <a href="#">
            <img src="${value.url}" alt="">
            <p>&nbsp;￥${value.price}</p><br />
            <strong>${value.title}</strong>
          </a>
        </li>
       `;
      });
      $cont.html($str);
    },
    error: function (e) {  //请求超时回调
      if (e.statusText == "timeout") {
        alert("请求超时");
      }
    },
  });
  //渲染main
  $.ajax({
    type: "post",  //默认get
    url: "http://10.31.157.77/800/php/data.php",  //默认当前页
    dataType: "json",
    success: function (d) {  //请求成功回调
      console.log(d)
      let $cont = $('.index-data-ul');
      // console.log($cont)
      let $str = '';
      // console.log($str);
      $.each(d, function (i, value) {
        // console.log(i);
        // console.log(value.url); 
        $str += `
            <li sid='${value.sid}'>
            <a href="http://10.31.157.77/800/src/detailpage.html?sid=${value.sid}">
              <img src=${value.url}
                alt="">
            </a>
            <div class="data-description ">
              <a href="http://10.31.157.77/800/src/detailpage.html?sid='${value.sid}'">${value.title}</a>
            </div>
            <h4>
              <em class="addRed">
                <b>¥</b>${value.newprice}
              </em>
              <del>¥${value.oldprice}
              </del>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <a href="http://10.31.157.77/800/src/detailpage.html?sid='${value.sid}'">找相似&gt;</a>
              <i>剩余${value.timeremaining}天</i>
            </h4>
            <!-- 隐藏框 -->
            <div class="bottom-word">
              <span">包邮</span>
              <i class="border_top"></i>
              <a href="#">[详情]
              </a>
              <a href="#" class="shc mycol">收藏
              </a>
            </div>
          </li> 
         `;
      });
      // console.log($str);
      $cont.html($str);
    },

    
    error: function (e) {  //请求超时回调
      if (e.statusText == "timeout") {
        alert("请求超时");
      }
    },
  });
  //渲染轮播图
  $.ajax({
    type: "post",  //默认get
    url: "http://10.31.157.77/800/php/data%20indexbanner.php",  //默认当前页
    dataType: "json",
    success: function (d) {  //请求成功回调
      let $cont = $('.left-banner');
      //轮播图结构
      let $str = '';
      let $v = [];
      $v.push(d);
      $str = `
                <ul>
                    <li style="display: block"><img src="${$v[0][0].url}" alt=""></li>
                    <li><img src="${$v[0][1].url}" alt=""></li>
                    <li><img src="${$v[0][2].url}" alt=""></li>
                    <li><img src="${$v[0][3].url}" alt=""></li>
                </ul>
                <ol>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ol>
                 `;
      console.log($str);
      $cont.html($str);
      //轮播图切换
      class banner {
        constructor() {
          this.$bbox = $('.left-banner');
          this.$pics = $('.left-banner ul li');
          this.$btns = $('.left-banner ol li');
          this.$num = 0;
          this.$timer = null;
        };
        init() {
          var _this = this;
          //点按钮图片切换 透明度变化
          this.$btns.on('mouseover', function () {
            $(this).css({ "background": "red" }).siblings().css({ "background": "#fff" });
            _this.$pics.stop().animate({
              opacity: "show"
            }, 500).eq($(this).index()).show().siblings().hide();
          });
          //自动切换
          this.$timer = setInterval(function () {
            _this.$num++;
            if (_this.$num > 3) { _this.$num = 0; };
            _this.$pics.eq(_this.$num).show().siblings().hide();
            _this.$btns.eq(_this.$num).css({ "background": "red" }).siblings().css({ "background": "#fff" });
          }, 1000);
          //鼠标进入div定时器关闭
          this.$bbox.on('mouseover', function () {
            clearInterval(_this.$timer);
          });
          //鼠标离开div重新开启定时器
          this.$bbox.on('mouseout', function () {
            _this.$timer = setInterval(function () {
              _this.$num++;
              if (_this.$num > 3) { _this.$num = 0; };
              _this.$pics.eq(_this.$num).show().siblings().hide();
              _this.$btns.eq(_this.$num).css({ "background": "red" }).siblings().css({ "background": "#fff" });
            }, 1000);
          });
          //购物车数量
          
        };
      };
      new banner().init();//调用
    },
    error: function (e) {  //请求超时回调
      if (e.statusText == "timeout") {
        alert("请求超时");
      }
    },
  });
  
});










