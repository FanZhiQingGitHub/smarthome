layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var $,tab;
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
    $ = layui.jquery;
    var userName = window.sessionStorage.getItem("userName");
    var userAccount = window.sessionStorage.getItem("userAccount")
    $("#userName").text(userName);
    var faceImgPath = window.sessionStorage.getItem("userHeadurl");
    if( "null" != faceImgPath && null != faceImgPath && undefined != faceImgPath && "" != faceImgPath){
        $("#userFaceRight").attr("src",faceImgPath);
        $("#userFaceLeft").attr("src",faceImgPath);
    }

    //手机设备的简单适配
    var treeMobile = $('.site-tree-mobile'),
        shadeMobile = $('.site-mobile-shade')

    treeMobile.on('click', function(){
        $('body').addClass('site-mobile');
    });

    shadeMobile.on('click', function(){
        $('body').removeClass('site-mobile');
    });


    //触发事件
    var active = {
        //在这里给active绑定几项事件，后面可通过active调用这些事件
        tabAdd: function(url,id,name) {
            //新增一个Tab项 传入三个参数，分别对应其标题，tab页面的地址，还有一个规定的id，是标签中data-id的属性值
            //关于tabAdd的方法所传入的参数可看layui的开发文档中基础方法部分
            element.tabAdd('adminBodyTab', {
                title: name,
                content: '<iframe data-frameid="'+id+'" scrolling="auto" frameborder="0" src="'+url+'" style="width:100%;height:100%;"></iframe>',
                id: id //规定好的id
            })
            optionFrameWh();  //计算ifram层的大小
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
    $(function () {
        $("body").on('click','.site-admin-active', function() {
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
    });



    $(window).resize(function () {
        optionFrameWh();
    })

    function optionFrameWh() {
        var h = $(window).height() -41- 10 - 60 -10-44 -10;
        $("iframe").css("height",h+"px");
    }


    $(function () {
        $("#exitPageMobile").click(function () {
            layer.confirm('您确定要退出到登录界面吗?', {icon: 3, title: '温馨提示'}, function (index) {
                layer.close(index);
                sessionStorage.clear();//清除session信息
                location.href = "/smarthome/user/path/userExit";
            });
        }),$("#exitPagePc").click(function () {
            layer.confirm('您确定要退出到登录界面吗?', {icon: 3, title: '温馨提示'}, function (index) {
                layer.close(index);
                sessionStorage.clear();//清除session信息
                location.href = "/smarthome/user/path/userExit";
            });
        }),$("#systemInfo").click(function () {
            showSystemInfo();
        });
    });

    //公告层
    function showSystemInfo(){
        layer.open({
            type: 1,
            title: "系统公告", //不显示标题栏
            closeBtn: false,
            area: '310px',
            shade: 0.8,
            id: 'LAY_layuipro', //设定一个id，防止重复弹出
            btn: ['火速围观'],
            moveType: 1, //拖拽模式，0或者1
            content: '<div style="padding:15px 20px; text-align:justify; line-height: 22px; text-indent:2em;border-bottom:1px solid #e2e2e2;"><p>欢迎使用smart home！</p></div>',
            success: function(layero){
                var btn = layero.find('.layui-layer-btn');
                btn.css('text-align', 'center');
                btn.on("click",function(){
                    window.sessionStorage.setItem("showNotice","true");
                })
                if($(window).width() > 432){  //如果页面宽度不足以显示顶部“系统公告”按钮，则不提示
                    btn.on("click",function(){
                        layer.tips('系统公告躲在了这里', '#showNotice', {
                            tips: 3
                        });
                    })
                }
            }
        });
    }

})


