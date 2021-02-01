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
    var login_height = $(window).height()/1.5;
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

    $.ajax({
        url: "/smarthome/public/findAllCount",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            if (msg.code == "200") {
                $("#userCount").text(msg.mapData.userCount);
                $("#adminCount").text(msg.mapData.adminCount);
                $("#menuCount").text(msg.mapData.menuCount);
                $("#infoCount").text(msg.mapData.infoCount);
            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    $.ajax({
        url: "/smarthome/public/findAllInfo",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            if (msg.code == "200") {
                var html = '' ;
                var num = 0;
                for(var i = 0;i<msg.data.length;i++){
                    num++;
                    html+='<button value="'+msg.data[i].infoId+'&'+msg.data[i].infoTitle+'&'+msg.data[i].infoDetail+'&'+msg.data[i].crtPsnId+'&'+msg.data[i].crtTm+'" class="info-item" style="border: none;background-color: transparent">'+num+'、'+msg.data[i].infoTitle+'</button><br />';
                }
                $("#infoDiv").html(html);

            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    $(document).on('click', '.info-item', function(e) {
        var arr = $(this).val().split("&");
        var index = layer.open({
            title : "查看资讯信息",
            type : 2,
            anim: 3,
            shade: 0.8,//表示的是阴影的大小
            content : "/smarthome/admin/path/protectInfo",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#infoId").val(arr[0]);
                body.find("#infoTitle").val(arr[1]);
                body.find("#infoDetail").val(arr[2]);
                body.find("#crtPsnId").val(arr[3]);
                body.find("#crtTm").val(arr[arr.length-1]);
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layer.full(index);
        })
        layer.full(index);
    });

    var video = document.getElementById("myvideo");
    var vList = ['/publicvideo/周杰伦-以父之名.mp4', '/publicvideo/周杰伦-以父之名.mp4']; // 初始化播放列表，这里的url要用相对路径
    var vLen = vList.length;
    var curr = 0;
    $(document).ready(function(){
        play();
        video.addEventListener('ended', function(){
            play();
        });
    });

    function play() {
        video.src = vList[curr];
        video.load();
        video.play();
        curr++;
        if(curr >= vLen){
            curr = 0; //重新循环播放
        }
    }

});