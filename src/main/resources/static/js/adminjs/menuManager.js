layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate', 'element', 'tree','table'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , tree = layui.tree
        , table = layui.table
        , $ = layui.jquery;

    table.render({
        elem: '#menuTable'
        , url: '/smarthome/admin/findMenuListInfo' //数据接口
        ,toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        ,defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        ,title: '菜单配置列表'
        , id: 'searchTable'
        ,height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        ,cols: [[
            {type: 'checkbox', fixed: 'left'}
            ,{field:'menuId', title:'菜单编号', fixed: 'left', unresize: true, sort: true,align: 'center',}
            ,{field:'menuName', title:'菜单名称', align: 'center'}
            ,{field:'menuUrl', title:'菜单URL', width:300,align: 'center',
                templet:function(d){
                    return d.menuUrl == "" || d.menuUrl == null || d.menuUrl == undefined ? '无':d.menuUrl;
                }
            }
            ,{field:'menuType', title:'菜单类型', align: 'center',
                templet:function(d){
                    return d.menuType == "" || d.menuType == null || d.menuType == undefined ? '无':d.menuType;
                }
            }
            ,{field:'crtPsnId', title:'创建人', align: 'center'}
            ,{field:'crtTm', title:'创建时间',align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'modPsnId', title:'修改人', align: 'center'}
            ,{field:'modTm', title:'修改时间', align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: 'right', title:'操作', toolbar: '#barDemo', align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(menuTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'getCheckData':
                var data = checkStatus.data;
                layer.alert(JSON.stringify(data));
                break;
            case 'getCheckLength':
                var data = checkStatus.data;
                layer.msg('选中了：'+ data.length + ' 个');
                break;
            case 'isAll':
                layer.msg(checkStatus.isAll ? '全选': '未全选');
                break;

            //自定义头工具栏右侧图标 - 提示
            case 'LAYTABLE_TIPS':
                layer.alert('这是工具栏右侧自定义的一个图标按钮');
                break;
        };
    });

    //监听行工具事件
    table.on('tool(menuTable)', function(obj){
        var data = obj.data;
        //console.log(obj)
        if(obj.event === 'del'){
            layer.confirm('真的删除行么', function(index){
                obj.del();
                layer.close(index);
            });
        } else if(obj.event === 'edit'){
            layer.prompt({
                formType: 2
                ,value: data.email
            }, function(value, index){
                obj.update({
                    email: value
                });
                layer.close(index);
            });
        }
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


});

