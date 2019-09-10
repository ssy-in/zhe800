$(document).ready(function () {
    $('.header').load("../dist/header.html");
    $('.main').load("../dist/cart-main.html");
    $('.footer').load("../dist/footer.html");  
    //渲染商品列表

    //1渲染函数 运行 3 4 5 6
    function goodslist(id, quantity) {

        $.ajax({
            type: "post",
            url: "http://10.31.157.77/800/php/data.php",
            dataType: "json",
        }).done(function (data) {
            //渲染
            $.each(data, function (index, value) {

                if (id == value.sid) {//遍历判断sid和传入的sid是否相同

                    var $clonebox = $('.goods-list:hidden').clone(true, true);

                    console.log(value.title);

                    $clonebox.find('.goods-title').find('img').attr('src', value.url);
                    $clonebox.find('.goods-title').find('img').attr('sid', value.sid);
                    $clonebox.find('.goods-title').find('b').html(value.title);
                    $clonebox.find('.goods-price div').html(value.newprice);
                    $clonebox.find('.goods-quantity').find('input').val(quantity);
                    //计算每个商品的价格。
                    $clonebox.find('.goods-zprice').find('div').html((value.newprice * quantity).toFixed(2));
                    //插入tbody
                    $clonebox.appendTo($('.goods-table').find("tbody")).show();
                }
            });

            //3无商品显示空盒子
            k();

            //4全选框操作
            zprice();

            //5计算总价 运行4
            var $inputs = $('.goods-list:visible').find(':checkbox');
            allck($inputs);


            //6商品数量改变 总价改变 运行4 7 8
            quantityjj();
            
            //9
            delgoods();
        });

    };

    //2取cookie sid num  运行1
    if (getcookie('cookiesid') && getcookie('cookienum')) {
        var sid = getcookie('cookiesid').split(',');//sid
        var num = getcookie('cookienum').split(',');//num
        $.each(sid, function (i, value) {
            //渲染数据
            goodslist(sid[i], num[i]);
        });
    };

    //3无商品显示空盒子
    function k() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            $('.k-box').hide();
        } else {
            $('.k-box').show();
        }
    };

    //4总价
    function zprice() {

        var $sum = 0;//数量
        var $zprice = 0;//总价
        $('.goods-list:visible').each(function (index, element) {
            if ($(element).find('.cart-checkbox input').prop('checked')) {
                $sum += parseInt($(element).find('.goods-quantity').find('input').val());
                $zprice += parseFloat($(element).find('.goods-zprice').find('div').html());
            };
        });

        $('.table-foot').find('span').html($sum);
        $('.table-foot').find('b').html($zprice.toFixed(2));
    }

    //5全选操作 运行4
    function allck($inputs) {
        //点全选框
        $('.all-check').on('change', function () {

            $inputs.prop('checked', $(this).prop('checked'));

            $('.all-check').prop('checked', $(this).prop('checked'));

            zprice();//取消重新记算

        });
        //点单个选择框
        $($inputs).on('change', function () {
            // console.log($('.goods-list:visible').find('input:checkbox'));

            if ($('.goods-list:visible').find('input:checkbox').length == $('.goods-list:visible').find('input:checked').size()) {
                $('.all-check').prop('checked', true);
            } else {
                $('.all-check').prop('checked', false);
            }
            zprice();//取消重新记算
        });

    }

    //6数量的改变  运行4 7 8 传给78当前元素
    function quantityjj() {
        //点击右键++
        $('.quantity-add').on('click', function () {

            var $count = $(this).parents('.goods-quantity').find('input').val();//值
            $count++;
            if ($count >= 99) {
                $count = 99;
            }
            $(this).parents('.goods-quantity').find('input').val($count);//赋值回去
            $(this).parents('.goods-list').find('.goods-zprice').find('div').html(singlegoodsprice($(this)));//改变后的价格

            zprice();//重新计算总和。

            setcookie($(this));//点击按钮将商品的数量和id存放cookie中

        });
        //点击左键--
        $('.quantity-minus').on('click', function () {


            var $count = $(this).parents('.goods-list').find('.goods-quantity input').val();
            $count--;
            if ($count <= 1) {
                $count = 1;
            }
            $(this).parents('.goods-list').find('.goods-quantity input').val($count);
            $(this).parents('.goods-list').find('.goods-zprice').find('div').html(singlegoodsprice($(this)));//改变后的价格
            zprice();
            setcookie($(this));

        });

        //输入改变数量
        $('.goods-quantity input').on('input', function () {
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
            // $(this).parents('.goods-item').find('.b-sum').find('strong').html(singlegoodsprice($(this)));//改变后的价格
            $(this).parents('.goods-list').find('.goods-zprice').find('div').html(singlegoodsprice($(this)));//改变后的价格 
            zprice();
            setcookie($(this));
        });







    };

    //7计算数量改变后单个商品的价格
    function singlegoodsprice(obj) {

        var $dj = parseFloat(obj.parents('.goods-list').find('.goods-price').find('div').html());//单价

        var $cnum = parseInt(obj.parents('.goods-list').find('.goods-quantity input').val());//数量

        return ($dj * $cnum).toFixed(2);//结果
    }

    //8将改变后的数量的值存放到cookie
    var arrsid = []; //sid
    var arrnum = []; //num
    //提前获取cookie里sid和num
    function cookietoarray() {
        if (getcookie('cookiesid') && getcookie('cookienum')) {
            arrsid = getcookie('cookiesid').split(',');//cookie商品的sid  
            arrnum = getcookie('cookienum').split(',');//cookie商品的num
        }
    }
    //根据sid存数量
    function setcookie(obj) {
        cookietoarray();//得到数组
        var $index = obj.parents('.goods-list').find('.goods-title').find('img').css('sid');//sid
        arrnum[$.inArray($index, arrsid)] = obj.parents('.goods-list').find('.goods-quantity input').val();//num
        addcookie('cookienum', arrnum.toString(), 7);//存7天
    }

    //9.删除操作


    function delgoods() {
        //删除cookie
        function delgoodslist(sid, arrsid) {//sid：当前删除的sid，arrsid:cookie的sid的值
            var $index = -1;
            $.each(arrsid, function (index, value) {//删除的sid对应的索引位置。 index:数组项的索引
                if (sid == value) {
                    $index = index;//如果传入的值和数组的值相同，返回值对应的索引。
                }
            });
            arrsid.splice($index, 1);//删除数组对应的值
            arrnum.splice($index, 1);//删除数组对应的值

              addcookie('cookiesid', arrsid.toString(), 7);//添加cookie
              addcookie('cookienum', arrnum.toString(), 7);//添加cookie
        }
        //删除商品
        $('.goods-remove').on('click','a', function () {
            cookietoarray();//8
            if (confirm('你确定要删除吗？')) {
                $(this).first().parents('.goods-list').remove();//通过当前点击的元素找到整个一行列表，删除
            }
            delgoodslist($(this).first().parents('.goods-list').find('.goods-title img').attr('sid'), arrsid);
            zprice();
        });
        //删除全部商品的函数
        $('.allck a').on('click', function () {
            cookietoarray();//8
            if (confirm('你确定要全部删除吗？')) {
                $('.goods-list:visible').each(function () {
                    if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
                        $(this).remove();
                        delgoodslist($(this).find('img').attr('sid'), arrsid);
                    }
                });
                zprice();
            }
        });






    }




});
