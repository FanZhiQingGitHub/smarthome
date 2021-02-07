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
        elem: '#userTable'
        , url: '/smarthome/admin/findALLUserList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '用户信息管理'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'userId', title:'用户编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'userAccount', title:'用户账号', align: 'center'}
            ,{field:'userName', title:'用户名称', width:150,align: 'center',}
            ,{field:'userSex', title:'性别', width:150,align: 'center',
                templet:function(d){
                    if(d.userSex != null && d.userSex !='' && d.userSex !=undefined){
                        if(d.userSex == '2'){
                            return '保密';
                        }
                        return d.userSex == '0' ? '男':'女';
                    }else{
                        return '无';
                    }
                }
            }
            ,{field:'userPhone', title:'手机', width:150,align: 'center',}
            ,{field:'userQq', title:'QQ号码', align: 'center',}
            ,{field:'userWechat', title:'微信号码', align: 'center',}
            ,{field:'userRoleName', title:'用户角色', align: 'center',}
            ,{field:'userStatus', title:'用户状态', align: 'center',width:130,
                templet:function(d){
                    return d.userStatus == '0' ? '启用':'禁用';
                }
            }
            // ,{field:'crtPsnId', title:'创建人', align: 'center',
            //     templet:function(d){
            //         return d.crtPsnId == "" || d.crtPsnId == null || d.crtPsnId == undefined ? '无':d.crtPsnId;
            //     }
            // }
            ,{field:'crtTm', title:'注册时间',width:180,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            // ,{field:'modPsnId', title:'修改人', align: 'center',
            //     templet:function(d){
            //         return d.modPsnId == "" || d.modPsnId == null || d.modPsnId == undefined ? '无':d.modPsnId;
            //     }
            // }
            // ,{field:'modTm', title:'修改时间',width:180,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:300,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(userTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'findUserDetailInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var index = layer.open({
                        title : "查看用户信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/admin/path/protectUser",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#userAccount").val(data[0].userAccount);
                            body.find("#userName").val(data[0].userName);
                            body.find('input[name=userSex][value='+data[0].userSex+']').attr("checked",data[0].userSex==data[0].userSex ? true : false);
                            body.find("#userPhone").val(data[0].userPhone);
                            body.find("#userQq").val(data[0].userQq);
                            body.find("#userWechat").val(data[0].userWechat);
                            body.find("#userPhone").val(data[0].userPhone);
                            body.find('input[name=userStatus][value='+data[0].userStatus+']').attr("checked",data[0].userStatus==data[0].userStatus ? true : false);
                            body.find("#userRoleName").val(data[0].userRoleName);
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
        $("#findUserDetailInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findUserDetailInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(userTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'disDbl'){
            layer.confirm('真的要禁用该用户吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectUserList",
                    async: true,
                    type: "post",
                    data: {"userId":data.userId,"userStatus":data.userStatus,"method":'1'},
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
        } else if(obj.event === 'openDbl'){
            layer.confirm('真的要启用该用户吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectUserList",
                    async: true,
                    type: "post",
                    data: {"userId":data.userId,"userStatus":data.userStatus,"method":'1'},
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
        }else if(obj.event === 'del'){
            layer.confirm('真的要删除该用户吗？', function(index){
                $.ajax({
                    url: "/smarthome/admin/protectUserList",
                    async: true,
                    type: "post",
                    data: {"userId":data.userId,"method":'2'},
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
    table.on('rowDouble(userTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看用户信息",
            type : 2,
            anim: 3,
            content : "/smarthome/admin/path/protectUser",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#userAccount").val(data.userAccount);
                body.find("#userName").val(data.userName);
                body.find('input[name=userSex][value='+data.userSex+']').attr("checked",data.userSex==data.userSex ? true : false);
                body.find("#userPhone").val(data.userPhone);
                body.find("#userQq").val(data.userQq);
                body.find("#userWechat").val(data.userWechat);
                body.find("#userPhone").val(data.userPhone);
                body.find('input[name=userStatus][value='+data.userStatus+']').attr("checked",data.userStatus==data.userStatus ? true : false);
                body.find("#userRoleName").val(data.userRoleName);
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
                    userAccount: $("#userAccount").val(),
                    userName: $("#userName").val(),
                    userPhone: $("#userPhone").val(),
                    userStatus: $("#userStatus").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("userForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },where: {
                    userAccount: $("#userAccount").val(),
                    userName: $("#userName").val(),
                    userPhone: $("#userPhone").val(),
                    userStatus: $("#userStatus").val(),
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

