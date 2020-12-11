layui.use(['tree', 'util','jquery','layer','layedit','laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , tree = layui.tree;
    $ = layui.jquery;
    var roleid = '';
    $('body').on('click', '.showTree', function () {
        roleid = $("#adminRole").val();
        var MenuId = [];
        $.ajax({
            url: '/smarthome/admin/findMenuPwr',
            async:true,
            type: 'get',
            data: {'adminRole':roleid},
            success: function (msg) {
                console.log(msg);
                console.log(msg.mapData.menu);
                if (msg.code == '500') {
                    layer.msg(msg.message,{icon:2});
                } else {
                    for(var i = 0;i<msg.mapData.mid.length;i++){
                        MenuId.push(msg.mapData.mid[i].id);
                    }
                    console.log(MenuId)
                    //基本演示
                    tree.render({
                        elem: '#menuTree'
                        , data: msg.mapData.menu
                        , showCheckbox: true  //是否显示复选框
                        , showLine:false
                        , id: 'checkId'
                        , checked:false
                    });
                    // tree.setChecked('checkId', MenuId); //批量勾选节点
                    $("#bu1").css("background","darkorange");
                    $("#bu1").css("color","white");
                    $("#bu1").attr("disabled", false);
                }
            }, error: function (data) {
                layer.alert("网络繁忙！",{icon:2});
            }
        });
    });

    // $('body').on('click', '.confirm', function () {
    //     var checkData = tree.getChecked('checkId');
    //     var fatherNodeId = [];
    //     var objectData = [];
    //     var sonNodeId = [];
    //     var checkedId = [];
    //     for(var i = 0;i<checkData.length;i++){
    //         fatherNodeId.push(checkData[i].id);
    //         objectData.push(checkData[i].children);
    //     }
    //     for(var j = 0;j<objectData.length;j++){
    //         for(var k in objectData[j]){
    //             sonNodeId.push(objectData[j][k].id);
    //         }
    //     }
    //     checkedId.push(fatherNodeId);
    //     checkedId.push(sonNodeId);
    //
    //     layer.confirm('您确定要修改吗?', {icon: 3, title:'提示'}, function(index){
    //         if(0 != checkedId.length){
    //             var msg = {'fatherNodeId':fatherNodeId,'sonNodeId':sonNodeId,'roleid':roleid};
    //             msg = JSON.stringify(msg);
    //             $.ajax({
    //                 url: path + '/user/updateMenu',
    //                 async:true,
    //                 type: 'post',
    //                 data: 'MenuTable='+msg,
    //                 datatype:'text',
    //                 success:function (data) {
    //                     if (data == "success"){
    //                         layer.alert("菜单配置成功，请重新登录！",{icon:6},function (index) {
    //                             layer.close(index);
    //                             window.parent.location.reload();
    //                             parent.layer.close(index);
    //                         });
    //
    //                     }else {
    //                         layer.alert("菜单配置失败！",{icon:2},function (index) {
    //                             layer.close(index);
    //                         });
    //                     }
    //                 },error:function (data) {
    //                     layer.alert("网络异常！",{icon:2},function (index) {
    //                         layer.close(index);
    //                     });
    //                 }
    //             })
    //         }
    //     });
    // });

});