layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;


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


    form.on('select(province)',function(data){
        $('select[name=city]').attr("disabled",false);
        layui.form.render("select");
        var info = data.value.split("&");
        console.log(info);
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
                    $("#city").append(html);
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
        var info = data.value.split("&");
        console.log(info);
        $.ajax({
            url: "/smarthome/public/findAreaList",
            async: true,
            type: "get",
            data: {"areaLvl":'3',"areaParentCode":info[0],"method":'0'},
            datatype: "text",
            success: function (msg) {
                if (msg.code == "200") {
                    var html = '<option value="">选择区/县</option>';
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
        oldPwd : function(value, item){
            if(value != "123456"){
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

    //判断是否修改过头像，如果修改过则显示修改后的头像，否则显示默认头像
    if(window.sessionStorage.getItem('userFace')){
        $("#userFace").attr("src",window.sessionStorage.getItem('userFace'));
    }else{
        $("#userFace").attr("src","../../images/face.jpg");
    }

})




