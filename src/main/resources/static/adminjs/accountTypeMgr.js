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
        elem: '#accountTypeTable'
        , url: '/smarthome/admin/findAllAccountTypeInfo' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '账号类型列表'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 15
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'accountTypeId', title:'类型编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'accountTypeNm', title:'类型名称', align: 'center'}
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
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:300,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(accountTypeTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addAccountType':
                var index = layer.open({
                    title : "添加账号类型信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/admin/path/protectAccountType",
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
            case 'findAccountTypeInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看账号类型信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/admin/path/protectAccountType",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#accountTypeId").val(data[0].accountTypeId);
                            body.find("#accountTypeNm").val(data[0].accountTypeNm);
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
        $("#findAccountTypeInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findAccountTypeInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(accountTypeTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'del'){
            layer.confirm('您确定要删除该账号类型吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectAccountTypeList",
                    async: true,
                    type: "post",
                    data: {"accountTypeId":data.accountTypeId,"method":'2'},
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
                title : "修改账号类型信息",
                type : 2,
                anim: 2,
                content : "/smarthome/admin/path/protectAccountType",
                success : function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                    body.find("#method").val('1');
                    body.find("#accountTypeId").val(data.accountTypeId);
                    body.find("#accountTypeNm").val(data.accountTypeNm);
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
    table.on('rowDouble(accountTypeTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看账号类型信息",
            type : 2,
            anim: 3,
            content : "/smarthome/admin/path/protectAccountType",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#accountTypeId").val(data.accountTypeId);
                body.find("#accountTypeNm").val(data.accountTypeNm);
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
                    accountTypeId: $("#accountTypeId").val(),
                    accountTypeNm: $("#accountTypeNm").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("accountTypeForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                }, where: {
                    accountTypeId: $("#accountTypeId").val(),
                    accountTypeNm: $("#accountTypeNm").val(),
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
        ,type: 'datetime'
    });
    laydate.render({
        elem: '#endTime'
        ,calendar: true
        ,type: 'datetime'
    });

});

