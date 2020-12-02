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

    form.on('submit(userLoginSubmit)', function (data) {
        var loadingIndex = layer.load(3, {
            shade: [0.2, 'gray'], //0.5透明度的灰色背景
            content: '登录中，请稍后......',
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '39px',
                    'width': '150px',
                    'color': '#eb7350'
                });
            }
        });
        $.ajax({
            url: "/smarthome/tbl-user/getUserInfoList",
            async: true,
            type: "get",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    layer.close(loadingIndex);
                    layer.msg("欢迎您，登录成功！", {icon: 6});
                    var timer = setInterval(function () {
                        location.href = "/smarthome/tbl-user/path/userMain";
                        clearInterval(timer);
                    }, 1600);
                }else if(msg.code == "404"){
                    layer.close(loadingIndex);
                    layer.msg(msg.message, {icon: 2});
                }else if(msg.code == "405") {
                    layer.close(loadingIndex);
                    layer.msg(msg.message, {icon: 2});
                }else if(msg.code == "406") {
                    layer.close(loadingIndex);
                    layer.msg(msg.message, {icon: 2});
                }else if(msg.code == "501"){
                    layer.close(loadingIndex);
                    layer.msg(msg.message, {icon: 2});
                }else if(msg.code == "500"){
                    layer.close(loadingIndex);
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
                $("#userLoginSubmit").trigger("click");
            }
        }),$("#userCodeImg").click(function () {
            var codeImg = document.getElementById("userCodeImg");
            codeImg.src = "/smarthome/tbl-user/loginCode?"+Math.random();
        }),$("#userUpdateCode").click(function () {
            var codeBut = document.getElementById("userCodeImg");
            codeBut.src = "/smarthome/tbl-user/loginCode?"+Math.random();
        }),$("#userReg").click(function () {
            location.href = "/smarthome/tbl-user/path/userReg";
        })
    });

});