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
                $("#infoSubmit").trigger("click");
            }
        }), $("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

    if(method == '0' || method == '1'){
        form.verify({
            infoTitle: function (value) {
                if (value.length < 2) {
                    return '您好，资讯标题至少得2个字符！';
                }else if (value.length > 30) {
                    return '您好，资讯标题最多只能输入30个字符！';
                }
            }, infoDetail: function (value) {
                if (value.length < 2) {
                    return '您好，资讯内容至少得2个字符！';
                }else if (value.length > 1000) {
                    return '您好，资讯内容最多只能输入1000个字符！';
                }
            }, content: function (value) {
                layedit.sync(editIndex);
            }
        });
        form.on('submit(infoSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/admin/protectInfoList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#infoId").val(msg.entityData.infoId);
                        parent.layui.table.reload('searchTable');
                    }else if(msg.code == "500" || msg.code == "501"){
                        layer.msg(msg.message, {icon: 2});
                    }
                }, error: function (msg) {
                    layer.msg("网络繁忙！", {icon: 2});
                }
            });

        });
    }else if(method == '3'){
        $('#infoTitle').attr("readonly",true);
        $('#infoDetail').attr("readonly",true);
        $('#crtPsnId').attr("readonly",true);
        $('#crtTm').attr("readonly",true);
        $('#infoSubmit').css("display","none");
        $('#infoReset').css("display","none");
    }

})
