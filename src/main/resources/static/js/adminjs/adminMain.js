layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;

    //设置轮播主体高度
    var login_height = $(window).height()/3.9;
    var zyl_car_height = $(".login_height").css("cssText","height:" + login_height + "px!important");


    //Login轮播主体
    carousel.render({
        elem: '#login'//指向容器选择器
        ,width: '100%' //设置容器宽度
        ,height:'zyl_car_height'
        ,arrow: 'always' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,autoplay: true //是否自动切换false true
        ,arrow: 'hover' //切换箭头默认显示状态||不显示：none||悬停显示：hover||始终显示：always
        ,indicator: 'none' //指示器位置||外部：outside||内部：inside||不显示：none
        ,interval: '3000' //自动切换时间:单位：ms（毫秒）
    });

    //监听轮播--案例暂未使用
    carousel.on('change(login)', function(obj){
        var loginCarousel = obj.index;
    });

    function timeTimer() {
        //实例化日期对象
        var dateInfo = new Date();
        //.innerHTML是dom里面的方法（获取对象的内容  或  向对象插入内容，可以直接在网页上显示）
        document.getElementById("sysTime").innerHTML = dateInfo.toLocaleDateString()+"&nbsp"+"&nbsp"+"&nbsp"+dateInfo.toLocaleTimeString();
    }
    setInterval(function() {timeTimer()},1000);


});

