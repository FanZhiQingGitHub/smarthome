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
        elem: '#billTable'
        , url: '/smarthome/user/findALLBillList' //数据接口
        , toolbar: '#toolbarDemo' //开启头部工具栏，并为其绑定左侧模板
        , defaultToolbar: ['filter', 'exports', 'print', { //自定义头部工具栏右侧图标。如无需自定义，去除该参数即可
            title: '提示'
            ,layEvent: 'LAYTABLE_TIPS'
            ,icon: 'layui-icon-tips'
        }]
        , title: '账单信息管理'
        , id: 'searchTable'
        , height: 'full-200'
        , cellMinWidth: 80
        , limit: 10
        , limits: [5,10, 15, 20]
        , cols: [[
            {type: 'radio', title:'单选',width:50,fixed: 'left'}
            ,{field:'hisbillId', title:'账单编号', width:120,fixed: '', unresize: true, sort: true,align: 'center',}
            ,{field:'hisbillName', title:'账单名称', align: 'center', width:120}
            ,{field:'hisbillDetail', title:'账单描述', align: 'center'}
            ,{field:'hisbillAmount', title:'账单金额', width:100,align: 'center',
                templet:function(d){
                    if(d.hisbillAmount != null && d.hisbillAmount !='' && d.hisbillAmount !=undefined){
                        return d.hisbillAmount+'元'
                    }else{
                        return '无'
                    }
                }
            }
            ,{field:'hisbillMen', title:'借款人',width:100,align: 'center',}
            ,{field:'hisbillMenphone', title:'借款人手机', width:120,align: 'center',}
            ,{field:'hisbillBegintime', title:'借款时间', width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.hisbillBegintime,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'hisbillEstreptm', title:'预计还款时间', width:200,align: 'center',templet: "<div>{{layui.util.toDateString(d.hisbillEstreptm,'yyyy-MM-dd HH:mm:ss')}}</div>"}
            ,{field:'hisbillEndtime', title:'还款时间', width:200,align: 'center',
                templet:function(d){
                    if(d.hisbillEndtime != null && d.hisbillEndtime !='' && d.hisbillEndtime !=undefined){
                        return layui.util.toDateString(d.hisbillEndtime,'yyyy-MM-dd HH:mm:ss')
                    }else{
                        return '无'
                    }
                }}
            ,{field:'hisbillType', title:'账单类型', width:120,align: 'center',
                templet:function(d){
                    if(d.hisbillType == '1'){
                        return '借款';
                    }else if(d.hisbillType == '2'){
                        return '鱼款';
                    }else if(d.hisbillType == '3'){
                        return '菜款';
                    }else if(d.hisbillType == '4'){
                        return '药草款';
                    }else if(d.hisbillType == '5'){
                        return '稻谷款';
                    }else if(d.hisbillType == '6'){
                        return '其它款';
                    }else{
                        return '无';
                    }
                }
            }
            ,{field:'hisbillStatus', title:'账单状态', width:120,align: 'center',
                templet:function(d){return d.hisbillStatus == '0' ? '已结':'未结';}
            }
            ,{field:'crtPsnId', title:'创建人', width:100,align: 'center',}
            ,{fixed: '', title:'操作', toolbar: '#barDemo', width:300,align: 'center'}
        ]]
        ,page: true
    });

    //头工具栏事件
    table.on('toolbar(billTable)', function(obj){
        var checkStatus = table.checkStatus(obj.config.id);
        switch(obj.event){
            case 'addBillInfo':
                var indexAdd = layer.open({
                    title : "添加账单信息",
                    type : 2,
                    anim: 3,
                    content : "/smarthome/user/path/protectBill",
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
            case 'findBillDetailInfo':
                var arr = checkStatus.data;
                if(arr.length == 0){
                    layer.msg('请选择一条数据');
                }else{
                    var data = new Function("return" + JSON.stringify(arr))();//转换后的JSON对象
                    var indexDetail = layer.open({
                        title : "查看账单信息",
                        type : 2,
                        anim: 3,
                        content : "/smarthome/user/path/protectBill",
                        success : function(layero, index){
                            var body = layer.getChildFrame('body', index);
                            var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                            body.find("#method").val('3');
                            body.find("#hisbillName").val(data[0].hisbillName);
                            body.find("#hisbillDetail").val(data[0].hisbillDetail);
                            body.find("#hisbillAmount").val(data[0].hisbillAmount);
                            body.find("#hisbillMen").val(data[0].hisbillMen);
                            body.find("#hisbillMenphone").val(data[0].hisbillMenphone);
                            body.find("#hisbillBegintime").val(data[0].hisbillBegintime);
                            body.find("#hisbillEstreptm").val(data[0].hisbillEstreptm);
                            if(data[0].hisbillEndtime == null || data[0].hisbillEndtime == '' || data[0].hisbillEndtime ==undefined){
                                body.find("#hisbillEndtime").val('无');
                            }else {
                                body.find("#hisbillEndtime").val(data[0].hisbillEndtime);
                            }
                            body.find("#hisbillType").val(data[0].hisbillType);
                            body.find('input[name=hisbillStatus][value='+data[0].hisbillStatus+']').attr("checked",data[0].hisbillStatus==data[0].hisbillStatus ? true : false);
                            body.find("#crtPsnId").val(data[0].crtPsnId);
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
        $("#findBillDetailInfo").mouseover(function() {
            layer.tips('您可以通过双击一条数据查看详情哦！', '#findBillDetailInfo', {
                tips: 2
            });
        });
    })

    //监听行工具事件
    table.on('tool(billTable)', function(obj){
        var data = obj.data;
        if(obj.event === 'disDbl'){
            layer.confirm('您确定要修改该账单状态为未结吗？', function(index){
                $.ajax({
                    url: "/smarthome/user/protectBillList",
                    async: true,
                    type: "post",
                    data: {"hisbillId":data.hisbillId,"hisbillStatus":'1',"method":'1'},
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
            layer.confirm('您确定要结算该条账单吗？', function(index){
                $.ajax({
                    url: "/smarthome/user/protectBillList",
                    async: true,
                    type: "post",
                    data: {"hisbillId":data.hisbillId,"hisbillStatus":'0',"method":'1'},
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
        }else if(obj.event === 'edit'){
            if(data.hisbillStatus == '0'){
                layer.msg("当前选择的账单已结算不能进行修改！", {icon: 2});
            }else {
                var index = layer.open({
                    title : "修改账单信息",
                    type : 2,
                    anim: 2,
                    content : "/smarthome/user/path/protectBill",
                    success : function(layero, index){
                        var body = layer.getChildFrame('body', index);
                        var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                        body.find("#method").val('1');
                        body.find("#hisbillId").val(data.hisbillId);
                        body.find("#hisbillName").val(data.hisbillName);
                        body.find("#hisbillDetail").val(data.hisbillDetail);
                        body.find("#hisbillAmount").val(data.hisbillAmount);
                        body.find("#hisbillMen").val(data.hisbillMen);
                        body.find("#hisbillMenphone").val(data.hisbillMenphone);
                        body.find("#hisbillBegintime").val(data.hisbillBegintime);
                        body.find("#hisbillEstreptm").val(data.hisbillEstreptm);
                        if(data.hisbillEndtime == null || data.hisbillEndtime == '' || data.hisbillEndtime ==undefined){
                            body.find("#hisbillEndtime").val('无');
                        }else {
                            body.find("#hisbillEndtime").val(data.hisbillEndtime);
                        }
                        body.find("#hisbillType").val(data.hisbillType);
                        body.find('input[name=hisbillStatus][value='+data.hisbillStatus+']').attr("checked",data.hisbillStatus==data.hisbillStatus ? true : false);
                        body.find("#crtPsnId").val(data.crtPsnId);
                    }
                })
                //改变窗口大小时，重置弹窗的高度，防止超出可视区域（如F12调出debug的操作）
                $(window).resize(function(){
                    layer.full(index);
                })
                table.reload('searchTable');
                layer.full(index);
            }
        }else if(obj.event === 'del'){
            layer.confirm('真的要删除该账单吗？', function(index){
                $.ajax({
                    url: "/smarthome/user/protectBillList",
                    async: true,
                    type: "post",
                    data: {"hisbillId":data.hisbillId,"method":'2'},
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
    table.on('rowDouble(billTable)', function(obj){
        var data = obj.data;
        var index = layer.open({
            title : "查看账单信息",
            type : 2,
            anim: 3,
            content : "/smarthome/user/path/protectBill",
            success : function(layero, index){
                var body = layer.getChildFrame('body', index);
                var iframeWin = layero.find('iframe')[0].contentWindow;//得到iframe页的窗口对象
                body.find("#method").val('3');
                body.find("#hisbillName").val(data.hisbillName);
                body.find("#hisbillDetail").val(data.hisbillDetail);
                body.find("#hisbillAmount").val(data.hisbillAmount);
                body.find("#hisbillMen").val(data.hisbillMen);
                body.find("#hisbillMenphone").val(data.hisbillMenphone);
                body.find("#hisbillBegintime").val(data.hisbillBegintime);
                body.find("#hisbillEstreptm").val(data.hisbillEstreptm);
                if(data.hisbillEndtime == null || data.hisbillEndtime == '' || data.hisbillEndtime ==undefined){
                    body.find("#hisbillEndtime").val('无');
                }else {
                    body.find("#hisbillEndtime").val(data.hisbillEndtime);
                }
                body.find("#hisbillType").val(data.hisbillType);
                body.find('input[name=hisbillStatus][value='+data.hisbillStatus+']').attr("checked",data.hisbillStatus==data.hisbillStatus ? true : false);
                body.find("#crtPsnId").val(data.crtPsnId);
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
                    hisbillId: $("#hisbillId").val(),
                    hisbillName: $("#hisbillName").val(),
                    hisbillMen: $("#hisbillMen").val(),
                    hisbillMenphone: $("#hisbillMenphone").val(),
                    hisbillType: $("#hisbillType").val(),
                    hisbillStatus: $("#hisbillStatus").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val(),
                    findDate: $("#findDate").val()
                }
            });
        }
    });

    $(function () {
        $("#resetTable").click(function () {
            document.getElementById("billForm").reset();
            table.reload('searchTable', {
                page: {
                    curr: 1 //重新从第 1 页开始
                },where: {
                    hisbillId: $("#hisbillId").val(),
                    hisbillName: $("#hisbillName").val(),
                    hisbillMen: $("#hisbillMen").val(),
                    hisbillMenphone: $("#hisbillMenphone").val(),
                    hisbillType: $("#hisbillType").val(),
                    hisbillStatus: $("#hisbillStatus").val(),
                    startTime: $("#startTime").val(),
                    endTime: $("#endTime").val(),
                    findDate: $("#findDate").val()
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
    laydate.render({
        elem: '#findDate'
        ,calendar: true
        ,type: 'datetime'
    });

});

