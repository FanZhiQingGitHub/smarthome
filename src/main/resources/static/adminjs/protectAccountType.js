layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();
    var accountTypeId = $("#accountTypeId").val();


    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#accountTypeSubmit").trigger("click");
            }
        }),$("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        }),$("#accountTypeReset").click(function () {
            $("#accountTypeId").val(accountTypeId);
        });
    });

    if(method == '0' || method == '1'){
        if(method == '1'){
            $('#accountTypeReset').css("display","none");
        }
        if(method == '0'){
            $("#numDiv").css('display','none');
        }
        form.verify({
            accountTypeNm: function (value) {
                if (value.length < 2) {
                    return '您好，类型名称至少得2个字符！';
                }else if (value.length > 11) {
                    return '您好，类型名称最多11个字符！';
                }
            }
            , content: function (value) {
                layedit.sync(editIndex);
            }
        });

        form.on('submit(accountTypeSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/admin/protectAccountTypeList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#accountTypeId").val(msg.entityData.accountTypeId);
                        $('#accountTypeReset').css("display","none");
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
        $('#accountTypeNm').attr("readonly",true);
        $('#accountTypeSubmit').css("display","none");
        $('#accountTypeReset').css("display","none");
    }
})
