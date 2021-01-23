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
        , url: '/smarthome/public/findOperationLogList' //数据接口
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
            ,{field:'operateId', title:'日志编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'operateUserName', title:'操作人', width:180,align: 'center'}
            ,{field:'operateUserId', title:'操作人账号', width:180,align: 'center'}
            ,{field:'operateModule', title:'操作模块', align: 'center',}
            ,{field:'norMessage', title:'操作内容(正常)', width:250,align: 'center',
                templet:function(d){
                    return d.norMessage == null || d.norMessage =='' || d.norMessage ==undefined ? '无':d.norMessage;
                }
            }
            ,{field:'excMessage', title:'操作内容(异常)', width:250,align: 'center',
                templet:function(d){
                    return d.excMessage == null || d.excMessage =='' || d.excMessage ==undefined ? '无':d.excMessage;
                }
            }
            ,{field:'operateType', title:'操作类型', align: 'center',}
            ,{field:'operateResult', title:'操作结果', align: 'center',
                templet:function(d){
                    return d.operateResult == '0' ? '正常':'异常';
                }
            }
            ,{field:'operateIp', title:'操作IP', align: 'center',}
            ,{field:'crtTm', title:'操作时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(logTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'findOperationLogDetail':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看日志信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/admin/path/protectOperationLog",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#operateId").val(data[0].operateId);
                            body.find("#headerParam").val(data[0].headerParam);
                            body.find("#operateMethod").val(data[0].operateMethod);
                            body.find("#operateUserId").val(data[0].operateUserId);
                            body.find("#operateUserName").val(data[0].operateUserName);
                            body.find("#operateUri").val(data[0].operateUri);
                            body.find("#operateIp").val(data[0].operateIp);
                            body.find("#operateModule").val(data[0].operateModule);
                            body.find("#operateType").val(data[0].operateType);
                            body.find("#operateDesc").val(data[0].operateDesc);
                            body.find("#operateResult").val(data[0].operateResult);
                            var norMsg = data[0].norMessage;
                            if(norMsg != null && norMsg !='' && norMsg != undefined){
                                body.find("#norMessage").val(norMsg);
                            }else {
                                body.find("#norMessage").val('无');
                            }
                            var excMsg = data[0].excMessage;
                            if(excMsg != null && excMsg !='' && excMsg != undefined){
                                body.find("#excMessage").val(excMsg);
                            }else {
                                body.find("#excMessage").val('无');
                            }
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
        $("#findOperationLogDetail").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findOperationLogDetail', {
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
            anim: 3,
            content : "/smarthome/admin/path/protectOperationLog",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#operateId").val(data.operateId);
                body.find("#headerParam").val(data.headerParam);
                body.find("#operateMethod").val(data.operateMethod);
                body.find("#operateUserId").val(data.operateUserId);
                body.find("#operateUserName").val(data.operateUserName);
                body.find("#operateUri").val(data.operateUri);
                body.find("#operateIp").val(data.operateIp);
                body.find("#operateModule").val(data.operateModule);
                body.find("#operateType").val(data.operateType);
                body.find("#operateDesc").val(data.operateDesc);
                body.find("#operateResult").val(data.operateResult);
                var norMsg = data.norMessage;
                if(norMsg != null && norMsg !='' && norMsg != undefined){
                    body.find("#norMessage").val(norMsg);
                }else {
                    body.find("#norMessage").val('无');
                }
                var excMsg = data.excMessage;
                if(excMsg != null && excMsg !='' && excMsg != undefined){
                    body.find("#excMessage").val(excMsg);
                }else {
                    body.find("#excMessage").val('无');
                }
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
                    operateId: $("#operateId").val(),
                    operateUserId: $("#operateUserId").val(),
                    operateUserName: $("#operateUserName").val(),
                    operateModule: $("#operateModule").val(),
                    operateType: $("#operateType").val(),
                    operateResult: $("#operateResult").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("operationForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }, where: {
                    operateId: $("#operateId").val(),
                    operateUserId: $("#operateUserId").val(),
                    operateUserName: $("#operateUserName").val(),
                    operateModule: $("#operateModule").val(),
                    operateType: $("#operateType").val(),
                    operateResult: $("#operateResult").val(),
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

