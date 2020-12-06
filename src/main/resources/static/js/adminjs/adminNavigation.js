layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var $,tab;
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


    // var nvas = [{
    //     "title" : "后台首页",
    //     "icon" : "icon-computer",
    //     "href" : "page/main.html",
    //     "spread" : false
    // },{
    //     "title" : "文章列表",
    //     "icon" : "icon-text",
    //     "href" : "page/news/newsList.html",
    //     "spread" : false
    // },{
    //     "title" : "友情链接",
    //     "icon" : "icon-text",
    //     "href" : "page/links/linksList.html",
    //     "spread" : false
    // },{
    //     "title" : "404页面",
    //     "icon" : "&#xe61c;",
    //     "href" : "page/404.html",
    //     "spread" : false
    // },{
    //     "title" : "系统基本参数",
    //     "icon" : "&#xe631;",
    //     "href" : "page/systemParameter/systemParam.html",
    //     "spread" : false
    // },{
    //     "title" : "二级菜单演示",
    //     "icon" : "&#xe61c;",
    //     "href" : "",
    //     "spread" : false,
    //     "children" : [
    //         {
    //             "title" : "二级菜单1",
    //             "icon" : "&#xe631;",
    //             "href" : "",
    //             "spread" : false
    //         },
    //         {
    //             "title" : "二级菜单2",
    //             "icon" : "&#xe631;",
    //             "href" : "",
    //             "spread" : false
    //         }
    //     ]
    // }];
    //
    //
    //
    // function navBar(data){
    //     var ulHtml = '<ul class="layui-nav layui-nav-tree">';
    //     for(var i=0;i<data.length;i++){
    //         if(data[i].spread){
    //             ulHtml += '<li class="layui-nav-item layui-nav-itemed">';
    //         }else{
    //             ulHtml += '<li class="layui-nav-item">';
    //         }
    //         if(data[i].children != undefined && data[i].children.length > 0){
    //             ulHtml += '<a href="javascript:;">';
    //             if(data[i].icon != undefined && data[i].icon != ''){
    //                 if(data[i].icon.indexOf("icon-") != -1){
    //                     ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
    //                 }else{
    //                     ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
    //                 }
    //             }
    //             ulHtml += '<cite>'+data[i].title+'</cite>';
    //             ulHtml += '<span class="layui-nav-more"></span>';
    //             ulHtml += '</a>'
    //             ulHtml += '<dl class="layui-nav-child">';
    //             for(var j=0;j<data[i].children.length;j++){
    //                 ulHtml += '<dd><a href="javascript:;" data-url="'+data[i].children[j].href+'">';
    //                 if(data[i].children[j].icon != undefined && data[i].children[j].icon != ''){
    //                     if(data[i].children[j].icon.indexOf("icon-") != -1){
    //                         ulHtml += '<i class="iconfont '+data[i].children[j].icon+'" data-icon="'+data[i].children[j].icon+'"></i>';
    //                     }else{
    //                         ulHtml += '<i class="layui-icon" data-icon="'+data[i].children[j].icon+'">'+data[i].children[j].icon+'</i>';
    //                     }
    //                 }
    //                 ulHtml += '<cite>'+data[i].children[j].title+'</cite></a></dd>';
    //             }
    //             ulHtml += "</dl>"
    //         }else{
    //             ulHtml += '<a href="javascript:;" data-url="'+data[i].href+'">';
    //             if(data[i].icon != undefined && data[i].icon != ''){
    //                 if(data[i].icon.indexOf("icon-") != -1){
    //                     ulHtml += '<i class="iconfont '+data[i].icon+'" data-icon="'+data[i].icon+'"></i>';
    //                 }else{
    //                     ulHtml += '<i class="layui-icon" data-icon="'+data[i].icon+'">'+data[i].icon+'</i>';
    //                 }
    //             }
    //             ulHtml += '<cite>'+data[i].title+'</cite></a>';
    //         }
    //         ulHtml += '</li>'
    //     }
    //     ulHtml += '</ul>';
    //     return ulHtml;
    // }


    $(function () {
        $("#exitPageMobile").click(function () {
            layer.confirm('您确定要退出到登录界面吗?', {icon: 3, title: '温馨提示'}, function (index) {
                layer.close(index);
                sessionStorage.clear();//清除session信息
                location.href = "/smarthome/admin/path/adminLogin";
            });
        }),$("#exitPagePc").click(function () {
            layer.confirm('您确定要退出到登录界面吗?', {icon: 3, title: '温馨提示'}, function (index) {
                layer.close(index);
                sessionStorage.clear();//清除session信息
                location.href = "/smarthome/admin/path/adminLogin";
            });
        }),$("#personalDataMobile").click(function () {
            layer.msg("暂未开放！", {icon: 2});
        }),$("#personalDataPc").click(function () {
            layer.msg("暂未开放！", {icon: 2});
        }),$("#updateAdminPwdMobile").click(function () {
            layer.msg("暂未开放！", {icon: 2});
        }),$("#updateAdminPwdPc").click(function () {
            layer.msg("暂未开放！", {icon: 2});
        });
    });

    $(function () {
        $("#backMain").click(function () {
            var htmltop_tab = "<li class='layui-this' lay-id=''><i class='iconfont icon-computer'></i> <cite>后台首页</cite></li>";
            var clildFrame = "<div class='layui-tab-item layui-show'><iframe src=/smarthome/admin/path/systemParam></iframe></div>";
            $(".layui-tab-title.top_tab").append(htmltop_tab);
            $(".layui-tab-content.clildFrame").append(clildFrame);
        });
    });

    // $("#div1").html(navBar(nvas));
    function timeTimer() {
        var d = new Date();//实例化日期对象
        var a = d.toLocaleTimeString();//获取日期
        var b = d.toLocaleDateString();//获取时间
        document.getElementById("sysTime").innerHTML = "系统时间："+b+"&nbsp"+"&nbsp"+"&nbsp"+a;//.innerHTML是dom里面的方法（获取对象的内容  或  向对象插入内容，可以直接在网页上显示）
    }
    setInterval(function() {timeTimer()},1000);


})

