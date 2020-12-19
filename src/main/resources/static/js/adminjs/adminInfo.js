layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var adminAccount = window.sessionStorage.getItem("adminAccount");//获取session中当前登录的管理员用户
    var adminAddressProvince = window.sessionStorage.getItem("adminAddressProvince");//获取session中当前登录的管理员用户
    var adminAddressCity = window.sessionStorage.getItem("adminAddressCity");//获取session中当前登录的管理员用户

    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#changeAdmin").trigger("click");
            }
        });
    });

    loadingProvince();//加载省市区下拉框
    form.on('select(adminAddressProvince)',function(data){
        $('select[name=adminAddressCity]').attr("disabled",false);
        layui.form.render("select");
        $('#adminAddressCity').empty();
        $('#adminAddressArea').empty();
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

                    $("#adminAddressCity").append(html);

                    layui.form.render("select");
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });

    });

    form.on('select(adminAddressCity)',function(data){
        $('select[name=adminAddressArea]').attr("disabled",false);
        layui.form.render("select");
        $('#adminAddressArea').empty();
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
                    $("#adminAddressArea").append(html);
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
        ,url: '/smarthome/admin/uploadAdminHeadInfo' //上传接口
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
        adminName: function (value) {
            if (value.length < 2) {
                return '您好，用户名至少得2个字符！';
            }
        }, adminRealName: function (value) {
            if (value.length < 2 || value.length > 4) {
                return '您好，真实姓名为2~4个字符！';
            }
        },
        content: function (value) {
            layedit.sync(editIndex);
        }

    });

    form.on('submit(changeAdmin)', function (data) {
        $.ajax({
            url: "/smarthome/admin/protectAdminProInfo",
            async: true,
            type: "post",
            data: data.field,
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
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
                if (msg.code == "200") {
                    // var html = '<option value="">---- 选择省 ----</option>';
                    var html ;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#adminAddressProvince").append(html);
                    $('select[name=adminAddressCity]').attr("disabled",false);
                    loadingCity(adminAddressProvince);//加载城市
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingCity(areaCode) {
        if(areaCode == null || areaCode == '' || areaCode == undefined){
            areaCode = '110101';
        }
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'2',"areaParentCode":areaCode,"method":'1'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html ;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#adminAddressCity").append(html);
                    $('select[name=adminAddressArea]').attr("disabled",false);
                    loadingArea(adminAddressCity);
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingArea(areaCode) {
        if(areaCode == null || areaCode == '' || areaCode == undefined){
            areaCode = '110101';
        }
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'3',"areaParentCode":areaCode,"method":'2'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html ;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#adminAddressArea").append(html);
                    loadingAdminInfo();//加载完省市区后加载个人信息
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingAdminInfo() {
        $.ajax({
            url: "/smarthome/admin/adminLogin",
            async: true,
            type: "get",
            data: {"adminAccount":adminAccount},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    $("#adminAccount").val(msg.entityData.adminAccount);
                    $("#adminName").val(msg.entityData.adminName);
                    $("#adminRealName").val(msg.entityData.adminRealName);
                    $("input[name=adminSex][value='"+msg.entityData.adminSex+"']").attr("checked", msg.entityData.adminSex == msg.entityData.adminSex ? true : false);
                    $("#adminPhone").val(msg.entityData.adminPhone);
                    $("#adminWorkphone").val(msg.entityData.adminWorkphone);
                    $("#adminMail").val(msg.entityData.adminMail);
                    $("#adminAddressProvince option[value='"+msg.entityData.adminAddressProvince+"']").attr("selected", true);
                    $("#adminAddressCity option[value='"+msg.entityData.adminAddressCity+"']").attr("selected", true);
                    $("#adminAddressArea option[value='"+msg.entityData.adminAddressArea+"']").attr("selected", true);
                    // $("input[name=adminStatus][value='"+msg.entityData.adminStatus+"']").attr("checked", msg.entityData.adminStatus == msg.entityData.adminStatus ? true : false);
                    // $("#adminRole").val(msg.entityData.adminRole);

                    $('#adminAccount').attr("readonly",true);
                    $('#adminName').attr("readonly",true);
                    $('#adminRealName').attr("readonly",true);
                    $("input[name='adminSex']").attr("disabled",true);
                    $('#adminPhone').attr("readonly",true);
                    $('#adminWorkphone').attr("readonly",true);
                    $('#adminMail').attr("readonly",true);
                    // $("input[name='adminStatus']").attr("disabled",true);
                    $("#adminAddressProvince").attr("disabled",true);
                    $("#adminAddressCity").attr("disabled",true);
                    $("#adminAddressArea").attr("disabled",true);
                    // $("#adminRole").attr("disabled",true);

                    $('#changeAdmin').addClass("layui-btn-disabled").attr("disabled",true);
                    $('#resetAdmin').addClass("layui-btn-disabled").attr("disabled",true);
                    $("#adminFace").attr("src",msg.entityData.adminHead);
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
        $("#changeAdminInfo").click(function () {
            layer.confirm('真的要修改个人资料吗？', function(index){
                $('#adminAccount').attr("readonly",true);
                $('#adminName').attr("readonly",false);
                $('#adminRealName').attr("readonly",false);
                $("input[name='adminSex']").removeAttr("disabled","disabled");
                $('#adminPhone').attr("readonly",false);
                $('#adminWorkphone').attr("readonly",false);
                $('#adminMail').attr("readonly",false);
                // $("input[name='adminStatus']").removeAttr("disabled","disabled");
                $("#adminAddressProvince").attr("disabled",false);
                $("#adminAddressCity").attr("disabled",false);
                $("#adminAddressArea").attr("disabled",false);
                // $("#adminRole").attr("disabled",false);
                $('#changeAdminInfo').addClass("layui-btn-disabled").attr("disabled",true);
                $('#changeAdmin').removeClass("layui-btn-disabled").attr("disabled",false);
                $('#resetAdmin').removeClass("layui-btn-disabled").attr("disabled",false);
                form.render();
                layer.close(index);
            });
        }),$("#resetAdmin").click(function () {
            $("#adminInfoFrom")[0].reset();
            $("#adminAccount").val(adminAccount);
            $('#adminAddressProvince').val("110000");
            $('#adminAddressCity').empty();
            $('#adminAddressArea').empty();
            $("#adminAddressCity").attr("disabled",true);
            $("#adminAddressArea").attr("disabled",true);
            form.render();
        })
    });

})




