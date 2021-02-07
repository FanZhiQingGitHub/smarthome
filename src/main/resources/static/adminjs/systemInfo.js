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
        elem: '#infoTable'
        , url: '/smarthome/admin/findALLInfoList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '平台资讯配置列表'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'infoId', title:'资讯编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'infoTitle', title:'资讯标题', width:230,align: 'center'}
            ,{field:'infoDetail', title:'资讯内容', align: 'center',}
            ,{field:'crtPsnId', title:'创建人',width:100, align: 'center',
                templet:function(d){
                    return d.crtPsnId == "" || d.crtPsnId == null || d.crtPsnId == undefined ? '无':d.crtPsnId;
                }
            }
            ,{field:'crtTm', title:'创建时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'modPsnId', title:'修改人',width:100, align: 'center',
                templet:function(d){
                    return d.modPsnId == "" || d.modPsnId == null || d.modPsnId == undefined ? '无':d.modPsnId;
                }
            }
            ,{field:'modTm', title:'修改时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:300,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(infoTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addInfoDetail':
                var index = layer.open({
                    title : "添加资讯信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/admin/path/protectInfo",
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
            case 'findInfoDetail':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看资讯信息",
                        type : 2,
                        content : "/smarthome/admin/path/protectInfo",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#infoId").val(data[0].infoId);
                            body.find("#infoTitle").val(data[0].infoTitle);
                            body.find("#infoDetail").val(data[0].infoDetail);
                            body.find("#crtPsnId").val(data[0].crtPsnId);
                            body.find("#crtTm").val(data[0].crtTm);
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
        $("#findInfoDetail").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findInfoDetail', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(infoTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('真的要删除该条资讯吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectInfoList",
                    async: true,
                    type: "post",
                    data: {"infoId":data.infoId,"method":'2'},
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
                title : "修改资讯信息",
                type : 2,
                anim: 2,
                content : "/smarthome/admin/path/protectInfo",
                success : function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                    body.find("#method").val('1');
                    body.find("#infoId").val(data.infoId);
                    body.find("#infoTitle").val(data.infoTitle);
                    body.find("#infoDetail").val(data.infoDetail);
                    body.find("#crtPsnId").val(data.crtPsnId);
                    body.find("#crtTm").val(data.crtTm);
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
    table.on('rowDouble(infoTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看资讯信息",
            type : 2,
            anim: 3,
            content : "/smarthome/admin/path/protectInfo",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#infoId").val(data.infoId);
                body.find("#infoTitle").val(data.infoTitle);
                body.find("#infoDetail").val(data.infoDetail);
                body.find("#crtPsnId").val(data.crtPsnId);
                body.find("#crtTm").val(data.crtTm);
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
                    infoTitle: $("#infoTitle").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("infoForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }, where: {
                    infoTitle: $("#infoTitle").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        });
    });

    //常规用法
    laydate.render({
        elem: '#startTime'
        ,calendar: true
        //,range: true
        //,format: 'yyyy-MM-dd HH:mm:ss'
    });
    laydate.render({
        elem: '#endTime'
        ,calendar: true
        //,range: true
        //,format: 'yyyy-MM-dd HH:mm:ss'
    });

});

