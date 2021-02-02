layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var verCode = '';

    //设置轮播主体高度
    var login_height = $(window).height()/1.3;
    var zyl_car_height = $(".login_height").css("cssText","height:" + login_height + "px!important");


    //Login轮播主体
    carousel.render({
        elem: '#login'//指向容器选择器
        ,width: '100%' //设置容器宽度
        ,height:'zyl_car_height'
        ,arrow: 'always' //始终显示箭头
        ,anim: 'fade' //切换动画方式
        ,autoplay: true //是否自动切换false true
        ,arrow: 'hover' //切换箭头默认显示状态||不显示：none||悬停显示：hover||始终显示：always
        ,indicator: 'none' //指示器位置||外部：outside||内部：inside||不显示：none
        ,interval: '5000' //自动切换时间:单位：ms（毫秒）
    });

    //监听轮播--案例暂未使用
    carousel.on('change(login)', function(obj){
        var loginCarousel = obj.index;
    });

    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#userRegSubmit").trigger("click");
            }
        }),$("#userCodeImg").click(function () {
            creatVerCode();
        }),$("#returnLogin").click(function () {
            location.href = "/smarthome/user/path/userLogin";
        }),$("#a1").click(function () {
            layer.open({
                title: '使用条款'
                ,
                content: '本应用深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。\n' +
                    '\n' +
                    '作者：Mr.Fan\n' +
                    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。'
            });
        }), $("#a2").click(function () {
            layer.open({
                title: '隐私保护'
                , content: '' +
                    '感谢您的支持，我们会重视您在体验中的个人隐私。同时您在使用我们的产品时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的本产品服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，以便您的理解。\n' +
                    '\n' +
                    '如对本《隐私政策》或相关事宜有任何问题，请通过smarthome@outlook.com与我们联系。\n' +
                    '\n' +
                    '作者：最后#的小组\n' +
                    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。'
            });
        });
    });

    creatVerCode();//初始化生成随机数
    //生成随机数
    function creatVerCode(){
        verCode = '';
        var codeLength = 4;//设置长度，这里看需求，我这里设置了4
        //设置随机字符
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R', 'S','T','U','V','W','X','Y','Z');
        for(var i = 0; i < codeLength; i++){ //循环codeLength 我设置的4就是循环4次
            var index = Math.floor(Math.random()*36); //设置随机数范围,这设置为0 ~ 36
            verCode += random[index]; //字符串拼接 将每次随机的字符 进行拼接
        }
        $("#userCodeImg").text(verCode);//将拼接好的字符串赋值给展示的Value
    }

    form.verify({
        userName: function (value) {
            if (value.length < 2) {
                return '您好，用户名至少得2个字符！';
            }else if (value.length > 16) {
                return '您好，用户名最多16个字符！';
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
            content: '注册中，请稍后......',
            success: function (layero) {
                layero.find('.layui-layer-content').css({
                    'padding-top': '39px',
                    'width': '150px',
                    'color': '#ee0a0a'
                });
            }
        });
        if(data.field.userCode.toLowerCase() != verCode.toLowerCase()) {
            layer.close(loadingIndex);
            layer.msg("验证码错误，请重新输入！", {icon: 2});
        }else {
            $.ajax({
                url: "/smarthome/user/userReg",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    layer.close(loadingIndex);
                    var timer;
                    if (msg.code == "200") {
                        timer = setInterval(function () {
                            location.href = "/smarthome/user/path/userLogin";
                            clearInterval(timer);
                        }, 10000);
                        layer.alert("恭喜您，注册成功！系统将在10s后跳转至登录界面，请记好您的账号："+msg.entityData.userAccount+"   点击确定可直接跳转至登录界面。",{icon:6,title:['温馨提示','font-size:100%'],skin:'demo'},function (index) {
                            layer.close(index);
                            clearInterval(timer);
                            location.href = "/smarthome/user/path/userLogin";
                        });
                        $("#userRegForm")[0].reset();
                        form.render();
                    }else if(msg.code == "500"){
                        layer.msg(msg.message, {icon: 2});
                    }else if(msg.code == "501"){
                        layer.msg("很遗憾，注册失败！", {icon: 2});
                    }
                }, error: function (msg) {
                    layer.close(loadingIndex);
                    layer.msg("网络繁忙！", {icon: 2});
                }
            });
        }
    });

});