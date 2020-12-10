layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();

    //查询父级菜单下拉框
    $.ajax({
        url: "/smarthome/admin/findALLMenuList",
        async: true,
        type: "get",
        data: {"method":'1'},
        datatype: "text",
        success: function (msg) {
            var selectVal = $("#selectVal").val();
            if (msg.code == "200") {
                var html = '<option value=""></option>';
                for(var i = 0;i<msg.data.length;i++){
                    if(msg.data[i].menuLevel == '0'){
                        html += '<option value="'+msg.data[i].menuId+'">'+msg.data[i].menuName+'</option>';
                    }
                }
                $("#menuSubId").append(html);
                $("#menuSubId").val(selectVal);
                layui.form.render("select");
            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });


    // form.on('radio(menuLevel)', function (data) {
    //     if( data.value == '0'){　//判断当前多选框是选中还是取消选中
    //         $("#selectDiv").css('display','block');
    //     }else{
    //         $("#selectDiv").css('display','none');
    //     }
    // });


    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#adminMenuSubmit").trigger("click");
            }
        })
    });

    if(method == '0' || method == '1'){
        form.verify({
            menuName: function (value) {
                if (value.length < 2) {
                    return '您好，账号至少得2个字符！';
                }
            },menuUrl: function (value) {
                var reg = /^[A-Za-z]+$/;
                if(!reg.test(value)){
                    return '您好，菜单地址只能是字母，不区分大小写！';
                }
                if (value.length < 2) {
                    return '您好，菜单地址至少得2个字符！';
                }
            }
            , content: function (value) {
                layedit.sync(editIndex);
            }
        });

        form.on('submit(adminMenuSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/admin/protectMenuList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                    }else if(msg.code == "500" || msg.code == "501"){
                        layer.msg(msg.message, {icon: 2});
                    }
                }, error: function (msg) {
                    layer.msg("网络繁忙！", {icon: 2});
                }
            });
        });
    }else if(method == '3'){
        $('#menuName').attr("readonly",true);
        $('#menuUrl').attr("readonly",true);
        $("input[name='menuLevel']").next().addClass('layui-radio-disbaled layui-disabled');
        $("#menuSubId").attr("disabled",true);
        $('#adminMenuSubmit').css("display","none");
        $('#adminMenureset').css("display","none");
    }




})