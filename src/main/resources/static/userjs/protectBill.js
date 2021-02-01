layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();


    $(function () {
        $(document).on('keydown', function (event) {
            if (event.keyCode == 13) {
                $("#billSubmit").trigger("click");
            }
        }),$("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

    if(method == '0' || method == '1'){
        $("#crtDiv").css('display','none');
        $("#hisbillEndtimeDiv").css('display','none');
        $("input[name='hisbillStatus']").next().addClass('layui-radio-disbaled layui-disabled');
        form.verify({
            hisbillName: function (value) {
                if (value.length < 2) {
                    return '您好，账单名称至少得2个字符！';
                }
            }, hisbillDetail: function (value) {
                if (value.length < 2) {
                    return '您好，账单描述至少得2个字符！';
                }else if(value.length > 1000){
                    return '您好，账单描述最多输入1000个汉字！';
                }
            }, hisbillAmount: function (value) {
                var amtreg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
                if(!amtreg.test(value)){
                    return "请输入正确的金额格式！";
                }
                if (value.length == 0) {
                    return '您好，账单金额不能为空！';
                }else if(value.length > 11){
                    return '您好，账单金额最多输入一百亿！';
                }
            }, hisbillMen: function (value) {
                if (value.length == 0) {
                    return '您好，借款人不能为空！';
                }else if(value.length > 4){
                    return '您好，借款人名称不得超过4个字！';
                }
            }, hisbillMenphone: function (value) {
                if (value.length == 0) {
                    return '您好，借款人手机不能为空！';
                }else if(value.length > 11){
                    return '您好，借款人手机格式不正确！';
                }
            }
            , content: function (value) {
                layedit.sync(editIndex);
            }
        });

        form.on('submit(billSubmit)', function (data) {
            $.ajax({
                url: "/smarthome/user/protectBillList",
                async: true,
                type: "post",
                data: data.field,
                datatype: "text",
                success: function (msg) {
                    if (msg.code == "200") {
                        layer.msg(msg.message, {icon: 6});
                        $("#method").val('1');//新增成功后method改为1，即修改
                        $("#hisbillId").val(msg.entityData.hisbillId);
                        parent.layui.table.reload('searchTable');
                    }else if(msg.code == "500" || msg.code == "501"){
                        layer.msg(msg.message, {icon: 2});
                    }
                }, error: function (msg) {
                    layer.msg("网络繁忙！", {icon: 2});
                }
            });
        });
    }else if(method == '3'){
        $('#hisbillName').attr("readonly",true);
        $('#hisbillDetail').attr("readonly",true);
        $('#hisbillAmount').attr("readonly",true);
        $('#hisbillMen').attr("readonly",true);
        $('#hisbillMenphone').attr("readonly",true);
        $("#hisbillBegintime").attr("disabled",true);
        $("#hisbillEstreptm").attr("disabled",true);
        $("#hisbillEndtime").attr("readonly",true);
        $("#hisbillType").attr("disabled", true);
        $("input[name='hisbillStatus']").next().addClass('layui-radio-disbaled layui-disabled');
        $("#crtPsnId").attr("readonly",true);
        $('#billSubmit').css("display","none");
        $('#billReset').css("display","none");
        $("#crtDiv").css('display','block');
        $("#hisbillEndtimeDiv").css('display','block');

    }
    //常规用法
    laydate.render({
        elem: '#hisbillBegintime'
        //,range: true
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });
    laydate.render({
        elem: '#hisbillEstreptm'
        //,range: true
        ,format: 'yyyy-MM-dd HH:mm:ss'
    });
    layui.form.render("select");
})
