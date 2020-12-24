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
        elem: '#logTable'
        , url: '/smarthome/admin/findSystemLogInfoList' //数据接口
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
            ,{field:'syslogId', title:'日志编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'syslogOperator', title:'操作人', width:180,align: 'center'}
            ,{field:'syslogDetail', title:'操作内容', align: 'center',}
            ,{field:'syslogType', title:'操作类型', align: 'center',}
            ,{field:'syslogResult', title:'操作结果', align: 'center',}
            ,{field:'syslogIp', title:'系统IP', align: 'center',}
            ,{field:'syslogTime', title:'操作时间', width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.syslogTime,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'crtTm', title:'创建时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(infoTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'findSystemLogDetail':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看日志信息",
                        type : 2,
                        content : "/smarthome/admin/path/protectSystemLog",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            // body.find("#infoId").val(data[0].infoId);
                            // body.find("#infoTitle").val(data[0].infoTitle);
                            // body.find("#infoDetail").val(data[0].infoDetail);
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
        $("#findSystemLogDetail").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findSystemLogDetail', {
                tips: 2
            });
        });
    })

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(logTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看日志信息",
            type : 2,
            content : "/smarthome/admin/path/protectSystemLog",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                // body.find("#infoId").val(data.infoId);
                // body.find("#infoTitle").val(data.infoTitle);
                // body.find("#infoDetail").val(data.infoDetail);
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
                    syslogOperator: $("#syslogOperator").val(),
                    syslogResult: $("#syslogResult").val(),
                    syslogType: $("#syslogType").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("systemLogForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }, where: {
                    syslogOperator: $("#syslogOperator").val(),
                    syslogResult: $("#syslogResult").val(),
                    syslogType: $("#syslogType").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        });
    });

    //常规用法
    laydate.render({
        elem: '#startTime'
        //,range: true
        //,format: 'yyyy-MM-dd HH:mm:ss'
    });
    laydate.render({
        elem: '#endTime'
        //,range: true
        //,format: 'yyyy-MM-dd HH:mm:ss'
    });

});

