layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;

    var userAccount = window.sessionStorage.getItem("userAccount");//获取session中当前登录的管理员用户
    var userAddressProvince = window.sessionStorage.getItem("userAddressProvince");//获取session中当前登录的管理员用户所在省份
    var userAddressCity = window.sessionStorage.getItem("userAddressCity");//获取session中当前登录的管理员用户所在城市

    loadingProvince();
    form.on('select(userAddressProvince)',function(data){
        $('select[name=userAddressCity]').attr("disabled",false);
        layui.form.render("select");
        $('#userAddressCity').empty();
        $('#userAddressArea').empty();
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'2',"areaParentCode":data.value,"method":'1'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html ;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#userAddressCity").append(html);
                    layui.form.render("select");
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });

    });

    form.on('select(userAddressCity)',function(data){
        $('select[name=userAddressArea]').attr("disabled",false);
        layui.form.render("select");
        $('#userAddressArea').empty();
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'3',"areaParentCode":data.value,"method":'2'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#userAddressArea").append(html);
                    layui.form.render("select");
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });

    var uploadInst = upload.render({
        elem: '#fileImport' //绑定元素
        ,url: '/smarthome/user/uploadUserHeadInfo' //上传接口
        ,multiple: true
        ,size: 500 //限制文件大小，单位 KB
        ,exts: 'jpg|jpeg' //只允许上传图片文件
        ,accept: 'file'//设置成可以上传所有类型文件
        ,progress:function(value){//上传进度回调 value进度值
            $("#fileProgress").show();
            element.progress('fileProcess', value+'%')//设置页面进度条
        }
        ,before: function () {

        }
        ,done: function (res) {
            //上传完毕回调
            if (res.code == "200") {
                layer.alert(res.message, {icon: 6});
                $("#fileProgress").hide();
            } else if (res.code == '500' || res.code == '501') {
                layer.msg(res.message, {icon: 2});
            }
        }
        , error: function () {
            //请求异常回调
            layer.msg("系统错误！", {icon: 2});
        }
    });

    //添加验证规则
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
        },userQq: function (value) {
            // 1 首位不能是0 ^[1-9]
            // 2 必须是 [5, 11] 位的数字 \d{4, 9}
            let reg = /^[1-9][0-9]{4,9}$/gim;
            if (!reg.test(value)) {
                return '请输入正确格式的QQ号码';
            }
        }, userWechat: function (value) {
            if (value.length > 100) {
                return '您好，微信账号不能超过100个字符！';
            } else if(value.length == 0){
                return '您好，请输入微信账号！';
            }
        },userIdcardnum: function (value) {
            if (value.length > 18) {
                return '您好，证件号码最长不能超过18个字符！';
            } else if(value.length == 0){
                return '您好，请输入证件号码！';
            }
        }, userGrdtSchcd: function (value) {
            if (value.length > 20) {
                return '您好，毕业院校最长不能超过20个字符！';
            }else if(value.length == 0){
                return '您好，请输入毕业院校！';
            }
        }, userMjr: function (value) {
            if (value.length > 20) {
                return '您好，所学专业最长不能超过20个字符！';
            }else if(value.length == 0){
                return '您好，请输入所学专业！';
            }
        }, userResume: function (value) {
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

    form.on('submit(changeUser)', function (data) {
        $.ajax({
            url: "/smarthome/user/protectUserInfo",
            async: true,
            type: "post",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    window.sessionStorage.setItem("userAddressProvince",msg.entityData.userAddressProvince);
                    window.sessionStorage.setItem("userAddressCity",msg.entityData.userAddressCity);
                    layer.msg(msg.message, {icon: 6});
                    form.render();
                }else if(msg.code == "500" || msg.code == "501"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });


    function loadingProvince() {
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'1',"method":'0'},
            datatype: "text",
            success: function (msg) {
                // if (msg.code == "200") {
                // var html = '<option value="">---- 选择省 ----</option>';
                var html ;
                for(var i = 0;i<msg.data.length;i++){
                    html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                }
                $("#userAddressProvince").append(html);
                $('select[name=userAddressCity]').attr("disabled",false);
                loadingCity(userAddressProvince);//加载城市
                // }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                //     layer.msg(msg.message, {icon: 2});
                // }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingCity(areaCode) {
        if("null" == areaCode || null == areaCode || undefined == areaCode || "" == areaCode){
            areaCode = '110100';
        }
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'2',"areaParentCode":areaCode,"method":'1'},
            datatype: "text",
            success: function (msg) {
                // if (msg.code == "200") {
                var html ;
                for(var i = 0;i<msg.data.length;i++){
                    html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                }
                $("#userAddressCity").append(html);
                $('select[name=userAddressArea]').attr("disabled",false);
                loadingArea(userAddressCity);
                // }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                //     layer.msg(msg.message, {icon: 2});
                // }
                //loadingAdminInfo();//加载完省市区后加载个人信息
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingArea(areaCode) {
        if("null" == areaCode || null == areaCode || undefined == areaCode || "" == areaCode){
            areaCode = '110101';
        }
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'3',"areaParentCode":areaCode,"method":'2'},
            datatype: "text",
            success: function (msg) {
                // if (msg.code == "200") {
                var html ;
                for(var i = 0;i<msg.data.length;i++){
                    html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                }
                $("#userAddressArea").append(html);
                // }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                //     layer.msg(msg.message, {icon: 2});
                // }
                loadingUserInfo();//加载完省市区后加载个人信息
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingUserInfo() {
        $.ajax({
            url: "/smarthome/user/userLogin",
            async: true,
            type: "get",
            data: {"userAccount":userAccount},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    $("#userAccount").val(msg.entityData.userAccount);
                    $("#userName").val(msg.entityData.userName);
                    $("input[name=userSex][value='"+msg.entityData.userSex+"']").attr("checked", msg.entityData.userSex == msg.entityData.userSex ? true : false);
                    $("#userAge").val(msg.entityData.userAge);
                    $("#userPhone").val(msg.entityData.userPhone);
                    $("#userWorkphone").val(msg.entityData.userWorkphone);
                    $("#userJob").val(msg.entityData.userJob);
                    $("#userMail").val(msg.entityData.userMail);
                    if("null" == msg.entityData.userAddressProvince || null == msg.entityData.userAddressProvince || undefined == msg.entityData.userAddressProvince || "" == msg.entityData.userAddressProvince){
                        $("#userAddressProvince option[value='110000']").attr("selected", true);
                    }else{
                        $("#userAddressProvince option[value='"+msg.entityData.userAddressProvince+"']").attr("selected", true);
                    }
                    if("null" == msg.entityData.userAddressCity || null == msg.entityData.userAddressCity || undefined == msg.entityData.userAddressCity || "" == msg.entityData.userAddressCity){
                        $("#userAddressCity option[value='110101']").attr("selected", true);
                    }else{
                        $("#userAddressCity option[value='"+msg.entityData.userAddressCity+"']").attr("selected", true);
                    }
                    if("null" == msg.entityData.userAddressArea || null == msg.entityData.userAddressArea || undefined == msg.entityData.userAddressArea || "" == msg.entityData.userAddressArea){
                        $("#userAddressArea option[value='110101']").attr("selected", true);
                    }else{
                        $("#userAddressArea option[value='"+msg.entityData.userAddressArea+"']").attr("selected", true);
                    }
                    $("#userAddressDetail").val(msg.entityData.userAddressDetail);
                    $("#userQq").val(msg.entityData.userQq);
                    $("#userWechat").val(msg.entityData.userWechat);
                    $("#userIdcardtype").val(msg.entityData.userIdcardtype);
                    $("#userIdcardnum").val(msg.entityData.userIdcardnum);
                    $("#userEddgrcd").val(msg.entityData.userEddgrcd);
                    $("#userDgrcd").val(msg.entityData.userDgrcd);
                    $("#userGrdtSchcd").val(msg.entityData.userGrdtSchcd);
                    $("#userMjr").val(msg.entityData.userMjr);
                    $("#userGrdtm").val(msg.entityData.userGrdtm);
                    $("#userResume").val(msg.entityData.userResume);

                    $('#userAccount').attr("readonly",true);
                    $('#userName').attr("readonly",true);
                    $("input[name='userSex']").attr("disabled",true);
                    $('#userAge').attr("readonly",true);
                    $('#userPhone').attr("readonly",true);
                    $('#userWorkphone').attr("readonly",true);
                    $("#userJob").attr("disabled",true);
                    $('#userMail').attr("readonly",true);
                    $("#userAddressProvince").attr("disabled",true);
                    $("#userAddressCity").attr("disabled",true);
                    $("#userAddressArea").attr("disabled",true);
                    $('#userAddressDetail').attr("readonly",true);
                    $('#userQq').attr("readonly",true);
                    $('#userWechat').attr("readonly",true);
                    $("#userIdcardtype").attr("disabled",true);
                    $('#userIdcardnum').attr("readonly",true);
                    $("#userEddgrcd").attr("disabled",true);
                    $("#userDgrcd").attr("disabled",true);
                    $('#userGrdtSchcd').attr("readonly",true);
                    $('#userMjr').attr("readonly",true);
                    $('#userGrdtm').attr("readonly",true);
                    $('#userResume').attr("readonly",true);

                    $('#changeUser').addClass("layui-btn-disabled").attr("disabled",true);
                    $('#resetUser').addClass("layui-btn-disabled").attr("disabled",true);
                    $("#userFace").attr("src",msg.entityData.userHeadurl);
                    form.render();
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    $(function () {
        $("#changeUserInfo").click(function () {
            layer.confirm('真的要修改个人资料吗？', function(index){
                $('#userAccount').attr("readonly",true);
                $('#userName').attr("readonly",false);
                $("input[name='userSex']").removeAttr("disabled","disabled");
                $('#userAge').attr("readonly",false);
                $('#userPhone').attr("readonly",false);
                $('#userWorkphone').attr("readonly",false);
                $("#userJob").attr("disabled",false);
                $('#userMail').attr("readonly",false);
                $("#userAddressProvince").attr("disabled",false);
                $("#userAddressCity").attr("disabled",false);
                $("#userAddressArea").attr("disabled",false);
                $('#userAddressDetail').attr("readonly",false);
                $('#userQq').attr("readonly",false);
                $('#userWechat').attr("readonly",false);
                $("#userIdcardtype").attr("disabled",false);
                $('#userIdcardnum').attr("readonly",false);
                $("#userEddgrcd").attr("disabled",false);
                $("#userDgrcd").attr("disabled",false);
                $('#userGrdtSchcd').attr("readonly",false);
                $('#userMjr').attr("readonly",false);
                $('#userGrdtm').attr("readonly",false);
                $('#userResume').attr("readonly",false);
                $('#changeUserInfo').addClass("layui-btn-disabled").attr("disabled",true);
                $('#changeUser').removeClass("layui-btn-disabled").attr("disabled",false);
                $('#resetUser').removeClass("layui-btn-disabled").attr("disabled",false);
                form.render();
                layer.close(index);
            });
        }),$("#resetUser").click(function () {
            $("#userInfoFrom")[0].reset();
            $("#userAccount").val(userAccount);
            $('#userAddressProvince').val("110000");
            $('#userAddressCity').empty();
            $('#userAddressArea').empty();
            $("#userAddressCity").attr("disabled",true);
            $("#userAddressArea").attr("disabled",true);
            form.render();
        }), $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#changeUserInfo").trigger("click");
            }
        });
    });

    laydate.render({
        elem: '#userGrdtm'
        ,calendar: true
        ,type: 'datetime'
    });

})




