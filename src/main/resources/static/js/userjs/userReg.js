layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
    $ = layui.jquery;
    form.verify({
        Name: function (value) {
            if (value.length < 2) {
                return '您好，用户名至少得2个字符！';
            }
        }, code :function (value) {
            if (value.length != 4) {
                return '您好，验证码是4位数！';
            }
        }, pass: [
            /^[\S]{6,12}$/
            , '您好，密码必须6~12位，且不能出现空格！'
        ], userAge :function (value) {
            if (value > 110) {
                return '您好，年龄不能超过110岁！';
            }else if(value < 0){
                return '您好，年龄不能小于0岁！';
            }else if(value.length == 0){
                return '您好，请输入您的年龄！';
            }
        }
        , Address: function (value) {
            if (value.length > 100) {
                return '您好，地址不能超过100个字符！';
            } else if(value.length == 0){
                return '您好，请输入详细通讯地址！';
            }
        }, QQ: function (value) {
            // 1 首位不能是0 ^[1-9]
            // 2 必须是 [5, 11] 位的数字 \d{4, 9}
            let reg = /^[1-9][0-9]{4,9}$/gim;
            if (!reg.test(value)) {
                return '请输入正确格式的QQ号码';
            }
        }, Wechat: function (value) {
            if (value.length > 100) {
                return '您好，微信账号不能超过100个字符！';
            } else if(value.length == 0){
                return '您好，请输入微信账号！';
            }
        },Idcardnum: function (value) {
            if (value.length > 18) {
                return '您好，证件号码最长不能超过18个字符！';
            } else if(value.length == 0){
                return '您好，请输入证件号码！';
            }
        }, GrdtSchcd: function (value) {
            if (value.length > 20) {
                return '您好，毕业院校最长不能超过20个字符！';
            }else if(value.length == 0){
                return '您好，请输入毕业院校！';
            }
        }, Mjr: function (value) {
            if (value.length > 20) {
                return '您好，所学专业最长不能超过20个字符！';
            }else if(value.length == 0){
                return '您好，请输入所学专业！';
            }
        }, Resume: function (value) {
            if (value.length > 1000) {
                return '您好，用户简介最长不能超过1000个字符！';
            }else if(value.length == 0){
                return '您好，请输入用户简介！';
            }
        },
        content: function (value) {
            layedit.sync(editIndex);
        }

    });

    form.on('submit(userRegSubmit)', function (data) {
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
            url: "/smarthome/tbl-user/addUserInfo",
            async: true,
            type: "post",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                var timer;
                if (msg.code == "200") {
                    timer = setInterval(function () {
                        location.href = "/smarthome/tbl-user/path/userLogin";
                        clearInterval(timer);
                    }, 10000);
                    layer.alert("恭喜您，注册成功！系统将在10s后跳转至登录界面，请记好您的账号："+msg.entitydata.userAccount+"   点击确定可直接跳转至登录界面。",{icon:6,title:['温馨提示','font-size:100%'],skin:'demo'},function (index) {
                        layer.close(index);
                        clearInterval(timer);
                        location.href = "/smarthome/tbl-user/path/userLogin";
                    });
                    layer.close(loadingIndex);
                    $("#userRegForm")[0].reset();
                    form.render();
                }else if(msg.code == "404"){
                    layer.close(loadingIndex);
                    layer.msg("注册失败！", {icon: 2});
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