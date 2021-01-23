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
        elem: '#adminTable'
        , url: '/smarthome/admin/findALLAdminList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '管理员信息管理'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'adminId', title:'管理员编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'adminAccount', title:'管理员账号', align: 'center'}
            ,{field:'adminName', title:'管理员名称', width:150,align: 'center',}
            ,{field:'adminSex', title:'性别', width:150,align: 'center',
                templet:function(d){
                    if(d.adminSex != null && d.adminSex !='' && d.adminSex !=undefined){
                        if(d.adminSex == '2'){
                            return '保密';
                        }
                        return d.adminSex == '0' ? '男':'女';
                    }else{
                        return '无';
                    }
                }
            }
            ,{field:'adminPhone', title:'手机', width:150,align: 'center',
                templet:function(d){
                    return d.adminPhone == "" || d.adminPhone == null || d.adminPhone == undefined ? '无':d.adminPhone;
                }
            }
            ,{field:'adminRoleName', title:'管理员角色', align: 'center',}
            ,{field:'adminStatus', title:'管理员状态', align: 'center',
                templet:function(d){
                    return d.adminStatus == '0' ? '启用':'禁用';
                }
            }
            ,{field:'crtPsnId', title:'创建人', align: 'center',
                templet:function(d){
                    return d.crtPsnId == "" || d.crtPsnId == null || d.crtPsnId == undefined ? '无':d.crtPsnId;
                }
            }
            ,{field:'crtTm', title:'创建时间',width:180,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            // ,{field:'modPsnId', title:'修改人', align: 'center',
            //     templet:function(d){
            //         return d.modPsnId == "" || d.modPsnId == null || d.modPsnId == undefined ? '无':d.modPsnId;
            //     }
            // }
            // ,{field:'modTm', title:'修改时间',width:180,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:200,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(adminTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addAdminInfo':
                var index = layer.open({
                    title : "新增管理员信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/admin/path/protectAdmin",
                    success : function(layero, index){
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
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
            case 'findAdminDetailInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看管理员信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/admin/path/protectAdmin",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#adminAccount").val(data[0].adminAccount);
                            body.find("#adminName").val(data[0].adminName);
                            body.find('input[name=adminSex][value='+data[0].adminSex+']').attr("checked",data[0].adminSex==data[0].adminSex ? true : false);
                            body.find("#adminPhone").val(data[0].adminPhone);
                            body.find('input[name=adminStatus][value='+data[0].adminStatus+']').attr("checked",data[0].adminStatus==data[0].adminStatus ? true : false);
                            body.find("#adminRoleName").val(data[0].adminRoleName);
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
        $("#findAdminDetailInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findAdminDetailInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(adminTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'disDbl'){
            if(data.adminRole == '1'){
                layer.msg('超级管理员禁止禁用！', {icon: 2});
            }else{
                layer.confirm('您确定要禁用该管理员吗？', function(index){
                    $.ajax({
                        url: "/smarthome/admin/protectAdminList",
                        async: true,
                        type: "post",
                        data: {"adminId":data.adminId,"adminStatus":data.adminStatus,"method":'1'},
                        datatype: "text",
                        success: function (msg) {
                            if (msg.code == "200") {
                                layer.msg(msg.message, {icon: 6});
                                table.reload('searchTable');
                            }else if(msg.code == "500" || msg.code == "501"){
                                layer.msg(msg.message, {icon: 2});
                            }
                        }, error: function (msg) {
                            layer.msg("网络繁忙！", {icon: 2});
                        }
                    });
                });
            }
        } else if(obj.event === 'openDbl'){
            if(data.adminRole == '1'){
                layer.msg('超级管理员禁止启用！', {icon: 2});
            }else{
                layer.confirm('您确定要启用该管理员吗？', function(index){
                    $.ajax({
                        url: "/smarthome/admin/protectAdminList",
                        async: true,
                        type: "post",
                        data: {"adminId":data.adminId,"adminStatus":data.adminStatus,"method":'1'},
                        datatype: "text",
                        success: function (msg) {
                            if (msg.code == "200") {
                                layer.msg(msg.message, {icon: 6});
                                table.reload('searchTable');
                            }else if(msg.code == "500" || msg.code == "501"){
                                layer.msg(msg.message, {icon: 2});
                            }
                        }, error: function (msg) {
                            layer.msg("网络繁忙！", {icon: 2});
                        }
                    });
                });
            }
        }else if(obj.event === 'del'){
            if(data.adminRole == '1'){
                layer.msg('超级管理员禁止删除！', {icon: 2});
            }else{
                layer.confirm('您确定要删除该用户吗？', function(index){
                    $.ajax({
                        url: "/smarthome/admin/protectAdminList",
                        async: true,
                        type: "post",
                        data: {"adminId":data.adminId,"method":'2'},
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
        }
    });

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(adminTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看管理员信息",
            type : 2,
            anim: 3,
            content : "/smarthome/admin/path/protectAdmin",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#adminAccount").val(data.adminAccount);
                body.find("#adminName").val(data.adminName);
                body.find('input[name=adminSex][value='+data.adminSex+']').attr("checked",data.adminSex==data.adminSex ? true : false);
                body.find("#adminPhone").val(data.adminPhone);
                body.find('input[name=adminStatus][value='+data.adminStatus+']').attr("checked",data.adminStatus==data.adminStatus ? true : false);
                body.find("#adminRoleName").val(data.adminRoleName);
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
                    adminAccount: $("#adminAccount").val(),
                    adminName: $("#adminName").val(),
                    adminPhone: $("#adminPhone").val(),
                    adminStatus: $("#adminStatus").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("adminForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },where: {
                    adminAccount: $("#adminAccount").val(),
                    adminName: $("#adminName").val(),
                    adminPhone: $("#adminPhone").val(),
                    adminStatus: $("#adminStatus").val(),
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

