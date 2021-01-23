layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate', 'element', 'tree','table'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , tree = layui.tree
        , table = layui.table
        , $ = layui.jquery;
    var method = '';

    table.render({
        elem: '#menuTable'
        , url: '/smarthome/admin/findALLMenuList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '菜单配置列表'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'menuId', title:'菜单编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'menuName', title:'菜单名称', align: 'center'}
            ,{field:'menuUrl', title:'菜单URL', width:300,align: 'center',
                templet:function(d){
                    return d.menuUrl == "" || d.menuUrl == null || d.menuUrl == undefined ? '无':d.menuUrl;
                }
            }
            /*
            ,{field:'menuType', title:'菜单类型', align: 'center',
                templet:function(d){
                    return d.menuType == "" || d.menuType == null || d.menuType == undefined ? '无':d.menuType;
                }
            }*/
            ,{field:'menuLevel', title:'是否父级', align: 'center',
                templet:function(d){
                    return d.menuLevel == '0' ? '是':'否';
                }
            }
            ,{field:'crtPsnId', title:'创建人', align: 'center',
                templet:function(d){
                    return d.crtPsnId == "" || d.crtPsnId == null || d.crtPsnId == undefined ? '无':d.crtPsnId;
                }
            }
            ,{field:'crtTm', title:'创建时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'modPsnId', title:'修改人', align: 'center',
                templet:function(d){
                    return d.modPsnId == "" || d.modPsnId == null || d.modPsnId == undefined ? '无':d.modPsnId;
                }
            }
            ,{field:'modTm', title:'修改时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:200,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(menuTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addMenuInfo':
                var index = layer.open({
                    title : "添加菜单信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/admin/path/protectMenu",
                    success : function(layero, index){
                        var body = layer.getChildFrame("body", index);
                        var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象
                        body.find("#method").val('0');
                    }
                })
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function(){
                    layer.full(index);
                })
                table.reload('searchTable');
                layer.full(index);
                break;
            case 'findMenuDetailInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看菜单信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/admin/path/protectMenu",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            var arr = data[0].menuUrl.split("/");
                            var url = arr[arr.length-1];
                            body.find("#method").val('3');
                            body.find("#menuId").val(data[0].menuId);
                            body.find("#menuName").val(data[0].menuName);
                            body.find("#menuUrl").val(url);
                            if(data[0].menuLevel == '0'){
                                body.find("#selectVal").val(data[0].menuId);
                            }else{
                                body.find("#selectVal").val(data[0].menuSubId);
                            }
                            body.find('input[name=menuLevel][value='+data[0].menuLevel+']').attr("checked",data[0].menuLevel==data[0].menuLevel ? true : false);
                        }
                    })
                    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                    $(window).resize(function(){
                        layer.full(index);
                    })
                    table.reload('searchTable');
                    layer.full(index);
                }
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });

    $(function () {
        $("#findMenuDetailInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findMenuDetailInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(menuTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('真的要删除该菜单吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectMenuList",
                    async: true,
                    type: "post",
                    data: {"menuId":data.menuId,"method":'2'},
                    datatype: "text",
                    success: function (msg) {
                        if (msg.code == "200") {
                            layer.msg(msg.message, {icon: 6});
                            obj.del();
                            layer.close(index);
                        }else if(msg.code == "500" || msg.code == "501"){
                            layer.msg(msg.message, {icon: 2});
                        }
                    }, error: function (msg) {
                        layer.msg("网络繁忙！", {icon: 2});
                    }
                });
            });
        } else if(obj.event === 'edit'){
            var index = layer.open({
                title : "修改菜单信息",
                type : 2,
                anim: 2,
                content : "/smarthome/admin/path/protectMenu",
                success : function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                    var arr = data.menuUrl.split("/");
                    var url = arr[arr.length-1];
                    body.find("#method").val('1');
                    body.find("#menuId").val(data.menuId);
                    body.find("#menuName").val(data.menuName);
                    body.find("#menuUrl").val(url);
                    if(data.menuLevel == '0'){
                        body.find("#selectVal").val(data.menuId);
                    }else{
                        body.find("#selectVal").val(data.menuSubId);
                    }
                    body.find('input[name=menuLevel][value='+data.menuLevel+']').attr("checked",data.menuLevel==data.menuLevel ? true : false);
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function(){
                layer.full(index);
            })
            table.reload('searchTable');
            layer.full(index);
        }
    });

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(menuTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看菜单信息",
            type : 2,
            anim: 3,
            content : "/smarthome/admin/path/protectMenu",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                var arr = data.menuUrl.split("/");
                var url = arr[arr.length-1];
                body.find("#method").val('3');
                body.find("#menuId").val(data.menuId);
                body.find("#menuName").val(data.menuName);
                body.find("#menuUrl").val(url);
                if(data.menuLevel == '0'){
                    body.find("#selectVal").val(data.menuId);
                }else{
                    body.find("#selectVal").val(data.menuSubId);
                }
                body.find('input[name=menuLevel][value='+data.menuLevel+']').attr("checked",data.menuLevel==data.menuLevel ? true : false);
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            layer.full(index);
        })
        table.reload('searchTable');
        layer.full(index);
        //标注选中样式
        obj.tr.addClass('layui-table-click').siblings().removeClass('layui-table-click');
    });

    $('#searchTable .layui-btn').on('click', function () {
        var type = $(this).data('type');
        if (type == 'reload') {
            //执行重载
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }
                , where: {
                    menuName: $("#menuName").val(),
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("menuForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }, where: {
                    menuName: $("#menuName").val(),
                }
            });
        });
    })

});

