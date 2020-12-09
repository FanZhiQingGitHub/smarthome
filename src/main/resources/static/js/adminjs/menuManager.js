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
            ,{field:'menuId', title:'菜单编号', width:120,fixed: 'left', unresize: true, sort: true,align: 'center',}
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
            ,{field:'menuLevel', title:'是否父级', align: 'center',
                templet:function(d){
                    return d.menuLevel == '0' ? '是':'否';
                }
            }
            ,{field:'crtPsnId', title:'创建人', align: 'center'}
            ,{field:'crtTm', title:'创建时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.crtTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'modPsnId', title:'修改人', align: 'center'}
            ,{field:'modTm', title:'修改时间',width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.modTm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{fixed: 'right', title:'操作', toolbar: '#barDemo', align: 'center'}
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
                    content : "/smarthome/admin/path/addMenu",
                    success : function(layero, index){
                        layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }
                })
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function(){
                    layer.full(index);
                })
                layer.full(index);
                break;
            case 'findMenuDetailInfo':
                var data = checkStatus.data;
                if(data.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    layer.alert(JSON.stringify(data));
                }
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

    //监听行单击事件（双击事件为：rowDouble）
    table.on('rowDouble(menuTable)', function(obj){
        var data = obj.data;
        layer.alert(JSON.stringify(data), {
            title: '当前行数据：'
        });
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


});

