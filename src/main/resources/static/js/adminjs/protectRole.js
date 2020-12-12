layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();


    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#roleSubmit").trigger("click");
            }
        })
    });

    if(method == '0' || method == '1'){
        form.verify({
            roleName: function (value) {
                if (value.length < 2) {
                    return '您好，角色名称至少得2个字符！';
                }
            }, content: function (value) {
                layedit.sync(editIndex);
            }
        });

        form.on('submit(roleSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/admin/protectRoleList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#roleId").val(msg.entityData.roleId);
                    }else if(msg.code == "500" || msg.code == "501"){
                        layer.msg(msg.message, {icon: 2});
                    }
                }, error: function (msg) {
                    layer.msg("网络繁忙！", {icon: 2});
                }
            });
        });
    }else if(method == '3'){
        $('#roleName').attr("readonly",true);
        $('#roleSubmit').css("display","none");
        $('#roleReset').css("display","none");
    }




})
