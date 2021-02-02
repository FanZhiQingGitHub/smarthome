layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;


    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#resetAdminPwdSubmit").trigger("click");
            }
        }),$("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        })
    });
    form.verify({
        adminAccount: function (value) {
            if (value.length != 9) {
                return '您好，管理员账号为9位数！';
            }
        }
        , content: function (value) {
            layedit.sync(editIndex);
        }
    });

    form.on('submit(resetAdminPwdSubmit)', function (data) {
        $.ajax({
            url: "/smarthome/admin/resetAdminPassword",
            async: true,
            type: "post",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    layer.alert(msg.message, {icon: 6},function () {
                        var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
                        parent.layer.close(index); //再执行关闭
                    });
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" ){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });


})
