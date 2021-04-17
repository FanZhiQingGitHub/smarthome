layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();
    var userPwd = window.sessionStorage.getItem("userPwd");

    $.ajax({
        url: "/smarthome/public/findAllAccountTypeInfo",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            if (msg.code == "200") {
                var accountTypeVal = $("#accountTypeVal").val();
                var html = '<option value="">请选择</option>';
                for(var i = 0;i<msg.data.length;i++){
                    html += '<option value="'+msg.data[i].accountTypeId+'">'+msg.data[i].accountTypeNm+'</option>';
                }
                $("#accountType").append(html);
                $("#accountType").val(accountTypeVal);
                layui.form.render("select");
            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#accountInfoSubmit").trigger("click");
            }
        }),$("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        }),$("#lookPwd").click(function () {
            if($("#lookPwd").text() == '显示密码'){
                layer.prompt({
                    formType: 1,
                    value: '',
                    offset: 'auto',
                    title: '请输入登录密码进行查看',
                }, function(value, index, elem){
                    if(sha1(value) == userPwd){
                        $("#pwdDiv").css('display','block');
                        $("#lookPwd").text('隐藏密码');
                        $("#lookPwd").css('backgroundColor','#009688');
                        layer.close(index);
                    }else{
                        layer.msg('您输入的查询密码错误，请重新输入！', {icon: 2});
                    }
                });
            }else if($("#lookPwd").text() == '隐藏密码'){
                $("#pwdDiv").css('display','none');
                $("#lookPwd").text('显示密码');
                $("#lookPwd").css('backgroundColor','red');
            }

        });
    });

    if(method == '0' || method == '1'){
        $("#findPwdDiv").css('display','none');
        $("#pwdDiv").css('display','block');
        if(method == '1'){
            $("#pwdDiv").css('display','none');
            $("#butPwdDiv").css('display','block');
            $("#accountReset").css('display','none');
        }

        form.verify({
            accountNum: function (value) {
                if (value.length < 2) {
                    return '您好，账单名称至少得2个字符！';
                }
            },pass: [
                /^[\S]{6,12}$/
                , '您好，密码必须6~12位，且不能出现空格！'
            ]
            , content: function (value) {
                layedit.sync(editIndex);
            }
        });
        form.on('submit(accountInfoSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/user/protectAccountList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#accountId").val(msg.entityData.accountId);
                        $('#accountReset').css("display","none");
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
        $('#accountNum').attr("readonly",true);
        $('#accountNm').attr("readonly",true);
        $('#accountPhone').attr("readonly",true);
        $('#accountPwdOne').attr("readonly",true);
        $('#accountPwdTwo').attr("readonly",true);
        $("#accountPwdThree").attr("readonly",true);
        $("#accountPwdSeu").attr("readonly",true);
        $("#accountMail").attr("readonly",true);
        $("#accountUrl").attr("readonly", true);
        $("#accountType").attr("disabled", true);
        $('#accountInfoSubmit').css("display","none");
        $('#accountReset').css("display","none");
        $("#findPwdDiv").css('display','none');
        $("#pwdDiv").css('display','none');
        $("#butPwdDiv").css('display','block');
    }
})
