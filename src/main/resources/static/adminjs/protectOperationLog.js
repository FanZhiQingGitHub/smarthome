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
        $('#operateId').attr("readonly",true);
        $('#headerParam').attr("readonly",true);
        $('#operateMethod').attr("readonly",true);
        $('#operateUserId').attr("readonly",true);
        $('#operateUserName').attr("readonly",true);
        $('#operateUri').attr("readonly",true);
        $('#operateIp').attr("readonly",true);
        $('#operateModule').attr("readonly",true);
        $('#operateType').attr("readonly",true);
        $('#operateDesc').attr("readonly",true);
        $('#operateResult').attr("disabled",true);
        $('#norMessage').attr("readonly",true);
        $('#excMessage').attr("readonly",true);
        $('#crtTm').attr("readonly",true);

    }
    layui.form.render("select");//重新渲染

    $(function () {
        $("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

})
