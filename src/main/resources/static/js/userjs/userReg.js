layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
    $ = layui.jquery;
    form.verify({
        required: function (value) {
            if (value.length < 2) {
                return '您好，用户名至少得2个字符！';
            }
        },
        code :function (value) {
            if (value.length != 4) {
                return '您好，验证码是4位数！';
            }
        },
        pass: [
            /^[\S]{6,12}$/
            , '您好，密码必须6~12位，且不能出现空格！'
        ], content: function (value) {
            layedit.sync(editIndex);
        }

    });

    form.on('submit(userRegSubmit)', function (data) {
        $.ajax({
            url: "/smarthome/tbl-user/addUserInfo",
            async: true,
            type: "get",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    layer.msg("恭喜您，登录成功！", {icon: 6});
                    var timer = setInterval(function () {
                        location.href = "/smarthome/tbl-user/path/userLogin";
                        clearInterval(timer);
                    }, 1500);
                }else if(msg.code == "404"){
                    layer.msg("注册失败！", {icon: 2});
                }else if(msg.code == "501"){
                    layer.msg(msg.message, {icon: 2});
                }else if(msg.code == "500"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.close(loadingIndex);
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });

    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#userRegSubmit").trigger("click");
            }
        }),$("#userCodeImg").click(function () {
            var codeImg = document.getElementById("userCodeImg");
            codeImg.src = "/smarthome/tbl-user/loginCode?"+Math.random();
        }),$("#userUpdateCode").click(function () {
            var codeBut = document.getElementById("userCodeImg");
            codeBut.src = "/smarthome/tbl-user/loginCode?"+Math.random();
        }),$("#returnLogin").click(function () {
            location.href = "/smarthome/tbl-user/path/userLogin";
        })
    });


    //执行一个laydate实例
    laydate.render({
        elem: '#userGrdtm' //指定元素
    });

});