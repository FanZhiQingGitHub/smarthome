layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = '';
    var adminAccount = window.sessionStorage.getItem("adminAccount");

    loadingProvince();//加载省市区下拉框
    loadingAdminInfo();//加载个人信息
    form.on('select(province)',function(data){
        $('select[name=city]').attr("disabled",false);
        layui.form.render("select");
        $('#city').empty();
        $('#area').empty();
        var info = data.value.split("&");
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'2',"areaParentCode":info[0],"method":'0'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html = '<option value="">---- 选择市 ----</option>';
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'&'+msg.data[i].areaLvl+'&'+msg.data[i].areaParentCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    var htmlarea = '<option value="">---- 选择区/县 ----</option>';
                    $("#city").append(html);
                    $("#area").append(htmlarea);
                    layui.form.render("select");
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });

    });

    form.on('select(city)',function(data){
        $('select[name=area]').attr("disabled",false);
        layui.form.render("select");
        $('#area').empty();
        var info = data.value.split("&");
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'3',"areaParentCode":info[0],"method":'0'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html;
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'&'+msg.data[i].areaLvl+'&'+msg.data[i].areaParentCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#area").append(html);
                    layui.form.render("select");
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    });



    upload.render({ //允许上传的文件后缀
        elem: '#fileImport'
        ,url: '' //改成您自己的上传接口
        ,accept: 'file' //普通文件
        ,exts: 'jpg|jpeg' //只允许上传压缩文件
        ,size: 500 //限制文件大小，单位 KB
        ,done: function(res){
            layer.msg('上传成功');
            console.log(res)
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

    //判断是否修改过头像，如果修改过则显示修改后的头像，否则显示默认头像
    if(window.sessionStorage.getItem('userFace')){
        $("#userFace").attr("src",window.sessionStorage.getItem('userFace'));
    }else{
        $("#userFace").attr("src","../../images/face.jpg");
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
                    $("#adminAddress").val(msg.entityData.adminAddressProvince+msg.entityData.adminAddressCity+msg.entityData.adminAddressArea);
                    $("input[name=adminStatus][value='"+msg.entityData.adminStatus+"']").attr("checked", msg.entityData.adminStatus == msg.entityData.adminStatus ? true : false);
                    $("#adminRole").val(msg.entityData.adminRole);

                    $('#adminAccount').attr("readonly",true);
                    $('#adminName').attr("readonly",true);
                    $('#adminRealName').attr("readonly",true);
                    $("input[name='adminSex']").attr("disabled",true);
                    $('#adminPhone').attr("readonly",true);
                    $('#adminWorkphone').attr("readonly",true);
                    $('#adminMail').attr("readonly",true);
                    $('#adminAddress').attr("readonly",true);
                    $("input[name='adminStatus']").attr("disabled",true);
                    $("#adminRole").attr("disabled",true);

                    $('#adminAddressDivSelect').css("display","none");
                    $('#changeAdmin').addClass("layui-btn-disabled").attr("disabled",true);
                    $('#resetAdmin').addClass("layui-btn-disabled").attr("disabled",true);
                    form.render();
                }else if(msg.code == "500" || msg.code == "501" || msg.code == "502" || msg.code == "503"){
                    layer.msg(msg.message, {icon: 2});
                }
            }, error: function (msg) {
                layer.msg("网络繁忙！", {icon: 2});
            }
        });
    }

    function loadingProvince() {
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'1',"method":'0'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html = '<option value="">---- 选择省 ----</option>';
                    for(var i = 0;i<msg.data.length;i++){
                        html += '<option value="'+msg.data[i].areaCode+'&'+msg.data[i].areaLvl+'&'+msg.data[i].areaParentCode+'">'+msg.data[i].areaName+'</option>';
                    }
                    $("#province").append(html);
                    $('select[name=city]').attr("disabled",true);
                    $('select[name=area]').attr("disabled",true);
                    layui.form.render("select");
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
            layer.confirm('真的要修改个人资料吗？(注：需要重新选择地址)', function(index){
                $('#adminAddressDivSelect').css("display","block");
                $('#adminAddressDiv').css("display","none");
                $('#adminAccount').attr("readonly",true);
                $('#adminName').attr("readonly",false);
                $('#adminRealName').attr("readonly",false);
                $("input[name='adminSex']").removeAttr("disabled","disabled");
                $('#adminPhone').attr("readonly",false);
                $('#adminWorkphone').attr("readonly",false);
                $('#adminMail').attr("readonly",false);
                $("input[name='adminStatus']").removeAttr("disabled","disabled");
                $("#adminRole").attr("disabled",false);
                $('#changeAdminInfo').addClass("layui-btn-disabled").attr("disabled",true);
                $('#changeAdmin').removeClass("layui-btn-disabled").attr("disabled",false);
                $('#resetAdmin').removeClass("layui-btn-disabled").attr("disabled",false);
                form.render();
                layer.close(index);
            });
        }),$("#resetAdmin").click(function () {
            $("#adminInfoFrom")[0].reset();
            $("#adminAccount").val(adminAccount);
            form.render();
        })
    });

})




