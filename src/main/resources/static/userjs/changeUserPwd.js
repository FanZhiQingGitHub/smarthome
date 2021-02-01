layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var userAccount = window.sessionStorage.getItem("userAccount");//获取session中当前登录的用户账号
    var userPwd = window.sessionStorage.getItem("userPwd");//获取session中当前登录的用户密码
    var userName = window.sessionStorage.getItem("userName");//获取session中当前登录的用户
    $("#userAccount").val(userAccount);
    $("#userName").val(userName);

    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#changePwd").trigger("click");
            }
        }),$("#resetChangePwd").click(function () {
            $("#changePwdForm")[0].reset();
            $("#userName").val(userName);
        });
    });

    //添加验证规则
    form.verify({
        oldPwd : function(value, item){
            if(sha1(value) != userPwd){
                return "密码错误，请重新输入！";
            }
        },
        newPwd : function(value, item){
            if(value.length < 6){
                return "密码长度不能小于6位";
            }
        },
        confirmPwd : function(value, item){
            if(!new RegExp($("#oldPwd").val()).test(value)){
                return "两次输入密码不一致，请重新输入！";
            }
        }
    })

    form.on('submit(changePwd)', function (data) {
        $.ajax({
            url: "/smarthome/user/protectUserInfo",
            async: true,
            type: "post",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                var timer;
                if (msg.code == "200") {
                    timer = setInterval(function () {
                        window.parent.location.href = "/smarthome/user/path/userLogin";
                        sessionStorage.clear();//清除session信息
                        clearInterval(timer);
                    }, 3000);
                    layer.alert("修改密码成功，请重新登录！（系统将在3s后自动跳转至登录页）", {icon: 6},function () {
                        sessionStorage.clear();//清除session信息
                        clearInterval(timer);
                        window.parent.location.href = "/smarthome/user/path/userLogin";
                    });
                }else if(msg.code == "500" || msg.code == "501"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });

})




