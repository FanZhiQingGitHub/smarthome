var $,tab;
layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
    $ = layui.jquery;

    $("#adminName").text( window.sessionStorage.getItem("adminName"));
    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade')

    treeMobile.on('click', function(){
        $('body').addClass('site-mobile');
    });

    shadeMobile.on('click', function(){
        $('body').removeClass('site-mobile');
    });


    function timeTimer() {
        var d = new Date();//实例化日期对象
        var a = d.toLocaleTimeString();//获取日期
        var b = d.toLocaleDateString();//获取时间
        document.getElementById("sysTime").innerHTML = "当前时间："+b+"&nbsp"+"&nbsp"+"&nbsp"+a;//.innerHTML是dom里面的方法（获取对象的内容  或  向对象插入内容，可以直接在网页上显示）
    }
    setInterval(function() {timeTimer()},1000);


})

