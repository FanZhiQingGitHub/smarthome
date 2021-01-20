layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var method = $("#method").val();


    if(method == '3'){
        $('#userAccount').attr("readonly",true);
        $('#userName').attr("readonly",true);
        $("input[name='userSex']").next().addClass('layui-radio-disbaled layui-disabled');
        $('#userPhone').attr("readonly",true);
        $('#userQq').attr("readonly",true);
        $('#userWechat').attr("readonly",true);
        $("input[name='userStatus']").next().addClass('layui-radio-disbaled layui-disabled');
        $('#userRoleName').attr("readonly",true);
    }

    $(function () {
        $("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

})
