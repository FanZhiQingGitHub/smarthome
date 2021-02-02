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
                $("#adminSubmit").trigger("click");
            }
        }),$("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

    if(method == '0' || method == '1'){
        $('#adminAccountDiv').css("display","none");
        $('#adminSexDiv').css("display","none");
        $('#adminPhoneDiv').css("display","none");
        $('#adminStatusDiv').css("display","none");
        $('#adminRoleNameDiv').css("display","none");
        $('#adminReset').css("display","none");
        form.verify({
            adminName: function (value) {
                if (value.length < 2) {
                    return '您好，管理员名称至少得2个字符！';
                }
            },
            pass: [
                /^[\S]{6,12}$/
                , '您好，密码必须6~12位，且不能出现空格！'
            ],
            content: function (value) {
                layedit.sync(editIndex);
            }
        });

        form.on('submit(adminSubmit)', function (data) {
            if(data.field.adminRole == '1'){
                layer.msg("您好，系统暂不支持新增超级管理员！",{icon: 2});
                return;
            }
            $.ajax({
                url: "/smarthome/admin/protectAdminList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#adminId").val(msg.entityData.adminId);
                        if(method == '0'){
                            layer.alert(msg.message,{icon:6,title:['温馨提示','font-size:100%'],skin:'demo'},function (index) {
                                layer.close(index);
                            });
                        }else{
                            layer.msg(msg.message, {icon: 6});
                        }
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
        $('#adminAccount').attr("readonly",true);
        $('#adminName').attr("readonly",true);
        $("input[name='adminSex']").next().addClass('layui-radio-disbaled layui-disabled');
        $('#adminPhone').attr("readonly",true);
        $("input[name='adminStatus']").next().addClass('layui-radio-disbaled layui-disabled');
        $('#adminRoleName').attr("readonly",true);
        $('#adminSubmit').css("display","none");
        $('#adminReset').css("display","none");
        $('#adminPwdDiv').css("display","none");
        $('#adminRoleDiv').css("display","none");
    }
    layui.form.render("select");//重新渲染

})
