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

    //触发事件
    var active = {
        //在这里给active绑定几项事件，后面可通过active调用这些事件
        tabAdd: function(url,id,name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
            element.tabAdd('adminBodyTab', {
                title: name,
                content: '<iframe data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'.html" style="width:100%;height:99%;"></iframe>',
                id: id //规定好的id
            })
            CustomRightClick(id); //给tab绑定右击事件
            FrameWH();  //计算ifram层的大小
        },
        tabChange: function(id) {
            //切换到指定Tab项
            element.tabChange('adminBodyTab', id); //根据传入的id传入到指定的tab项
        },
        tabDelete: function (id) {
            element.tabDelete("adminBodyTab", id);//删除
        }
        , tabDeleteAll: function (ids) {//删除所有
            $.each(ids, function (i,item) {
                element.tabDelete("adminBodyTab", item); //ids是一个数组，里面存放了多个id，调用tabDelete方法分别删除
            })
        }
    };


    //当点击有site-demo-active属性的标签时，即左侧菜单栏中内容 ，触发点击事件
    $('.site-admin-active').on('click', function() {
        var dataid = $(this);
        //这时会判断右侧.layui-tab-title属性下的有lay-id属性的li的数目，即已经打开的tab项数目
        if ($(".layui-tab-title li[lay-id]").length <= 0) {
            //如果比零小，则直接打开新的tab项
            active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
        } else {
            //否则判断该tab项是否以及存在
            var isData = false; //初始化一个标志，为false说明未打开该tab项 为true则说明已有
            $.each($(".layui-tab-title li[lay-id]"), function () {
                //如果点击左侧菜单栏所传入的id 在右侧tab项中的lay-id属性可以找到，则说明该tab项已经打开
                if ($(this).attr("lay-id") == dataid.attr("data-id")) {
                    isData = true;
                }
            })
            if (isData == false) {
                //标志为false 新增一个tab项
                active.tabAdd(dataid.attr("data-url"), dataid.attr("data-id"),dataid.attr("data-title"));
            }
        }
        //最后不管是否新增tab，最后都转到要打开的选项页面上
        active.tabChange(dataid.attr("data-id"));
    });

    function CustomRightClick(id) {
        //取消右键  rightmenu属性开始是隐藏的 ，当右击的时候显示，左击的时候隐藏
        $('.layui-tab-title li').on('contextmenu', function () { return false; })
        $('.layui-tab-title,.layui-tab-title li').click(function () {
            $('.rightmenu').hide();
        });
        //桌面点击右击
        $('.layui-tab-title li').on('contextmenu', function (e) {
            var popupmenu = $(".rightmenu");
            popupmenu.find("li").attr("data-id",id); //在右键菜单中的标签绑定id属性
            //判断右侧菜单的位置
            l = ($(document).width() - e.clientX) < popupmenu.width() ? (e.clientX - popupmenu.width()) : e.clientX;
            t = ($(document).height() - e.clientY) < popupmenu.height() ? (e.clientY - popupmenu.height()) : e.clientY;
            popupmenu.css({ left: l, top: t }).show(); //进行绝对定位
            //alert("右键菜单")
            return false;
        });
    }

    // $(".rightmenu li").click(function () {
    //
    //     //右键菜单中的选项被点击之后，判断type的类型，决定关闭所有还是关闭当前。
    //     if ($(this).attr("data-type") == "closethis") {
    //         //如果关闭当前，即根据显示右键菜单时所绑定的id，执行tabDelete
    //         active.tabDelete($(this).attr("data-id"))
    //     } else if ($(this).attr("data-type") == "closeall") {
    //         var tabtitle = $(".layui-tab-title li");
    //         var ids = new Array();
    //         $.each(tabtitle, function (i) {
    //             ids[i] = $(this).attr("lay-id");
    //         })
    //         //如果关闭所有 ，即将所有的lay-id放进数组，执行tabDeleteAll
    //         active.tabDeleteAll(ids);
    //     }
    //
    //     $('.rightmenu').hide(); //最后再隐藏右键菜单
    // })
    function FrameWH() {
        var h = $(window).height() -41- 10 - 60 -10-44 -10;
        $("iframe").css("height",h+"px");
    }

    $(window).resize(function () {
        FrameWH();
    })








    function timeTimer() {
        var d = new Date();//实例化日期对象
        var a = d.toLocaleTimeString();//获取日期
        var b = d.toLocaleDateString();//获取时间
        document.getElementById("sysTime").innerHTML = "系统时间："+b+"&nbsp"+"&nbsp"+"&nbsp"+a;//.innerHTML是dom里面的方法（获取对象的内容  或  向对象插入内容，可以直接在网页上显示）
    }
    setInterval(function() {timeTimer()},1000);


})

