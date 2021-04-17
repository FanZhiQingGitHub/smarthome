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

    $.ajax({
        url: "/smarthome/public/findAllAccountTypeInfo",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            if (msg.code == "200") {
                var html = '<option value="">请选择</option>';
                for(var i = 0;i<msg.data.length;i++){
                    html += '<option value="'+msg.data[i].accountTypeId+'">'+msg.data[i].accountTypeNm+'</option>';
                }
                $("#accountType").append(html);
                layui.form.render("select");
            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    table.render({
        elem: '#accountTable'
        , url: '/smarthome/user/findALLAccountList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '账号密码信息管理'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'accountId', title:'账号编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'accountNum', title:'账号', width:150,align: 'center'}
            ,{field:'accountPhone', title:'关联手机', width:150,align: 'center',}
            ,{field:'accountMail', title:'关联邮箱',align: 'center',}
            ,{field:'accountUrl', title:'关联网址',align: 'center',
                templet:function(d){
                    if(d.accountUrl != null && d.accountUrl !='' && d.accountUrl !=undefined){
                        return d.accountUrl
                    }else{
                        return '无'
                    }
                }}
            ,{field:'accountTypeNm', title:'账号类型', width:150,align: 'center'}
            ,{field:'crtTm', title:'创建时间', width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'crtPsnId', title:'创建人', width:200,align: 'center',}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:300,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(accountTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addAccountInfo':
                var indexAdd = layer.open({
                    title : "添加账号密码信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/user/path/protectAccount",
                    success : function(layero, index){
                        var body = layer.getChildFrame("body", index);
                        var iframeWin = window[layero.find('iframe')[0]['name']]; //得到iframe页的窗口对象
                        body.find("#method").val('0');
                    }
                })
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function(){
                    layer.full(indexAdd);
                })
                table.reload('searchTable');
                layer.full(indexAdd);
                break;
            case 'findAccountDetailInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var indexDetail = layer.open({
                        title : "查看账单信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/user/path/protectAccount",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#accountId").val(data[0].accountId);
                            body.find("#accountNum").val(data[0].accountNum);
                            body.find("#accountPhone").val(data[0].accountPhone);
                            body.find("#accountPwdOne").val(data[0].accountPwdOne);
                            body.find("#accountPwdTwo").val(data[0].accountPwdTwo);
                            body.find("#accountPwdThree").val(data[0].accountPwdThree);
                            body.find("#accountMail").val(data[0].accountMail);
                            body.find("#accountUrl").val(data[0].accountUrl);
                            body.find("#accountTypeVal").val(data[0].accountType);
                        }
                    })
                    //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                    $(window).resize(function(){
                        layer.full(indexDetail);
                    })
                    table.reload('searchTable');
                    layer.full(indexDetail);
                }
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });

    $(function () {
        $("#findAccountDetailInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findAccountDetailInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(accountTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'edit'){
            var index = layer.open({
                title : "修改账号密码信息",
                type : 2,
                anim: 2,
                content : "/smarthome/user/path/protectAccount",
                success : function(layero, index){
                    var body = layer.getChildFrame('body', index);
                    var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                    body.find("#method").val('1');
                    body.find("#accountId").val(data.accountId);
                    body.find("#accountNum").val(data.accountNum);
                    body.find("#accountPhone").val(data.accountPhone);
                    body.find("#accountPwdOne").val(data.accountPwdOne);
                    body.find("#accountPwdTwo").val(data.accountPwdTwo);
                    body.find("#accountPwdThree").val(data.accountPwdThree);
                    body.find("#accountMail").val(data.accountMail);
                    body.find("#accountUrl").val(data.accountUrl);
                    body.find("#accountTypeVal").val(data.accountType);
                }
            })
            //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
            $(window).resize(function(){
                layer.full(index);
            })
            table.reload('searchTable');
            layer.full(index);
        }else if(obj.event === 'del'){
            layer.confirm('您确定要删除该条记录吗？', function(index){
                $.ajax({
                    url: "/smarthome/user/protectAccountList",
                    async: true,
                    type: "post",
                    data: {"accountId":data.accountId,"method":'2'},
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
        }
    });

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(accountTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看账号密码信息",
            type : 2,
            anim: 3,
            content : "/smarthome/user/path/protectAccount",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#accountId").val(data.accountId);
                body.find("#accountNum").val(data.accountNum);
                body.find("#accountPhone").val(data.accountPhone);
                body.find("#accountPwdOne").val(data.accountPwdOne);
                body.find("#accountPwdTwo").val(data.accountPwdTwo);
                body.find("#accountPwdThree").val(data.accountPwdThree);
                body.find("#accountMail").val(data.accountMail);
                body.find("#accountUrl").val(data.accountUrl);
                body.find("#accountTypeVal").val(data.accountType);
            }
        })
        //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
        $(window).resize(function(){
            // layer.full(index);
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
                    accountNum: $("#accountNum").val(),
                    accountPhone: $("#accountPhone").val(),
                    accountType: $("#accountType").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("accountForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },where: {
                    accountNum: $("#accountNum").val(),
                    accountPhone: $("#accountPhone").val(),
                    accountType: $("#accountType").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        });
    })

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

