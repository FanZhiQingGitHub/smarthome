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
        $('#syslogId').attr("readonly",true);
        $('#syslogOperator').attr("readonly",true);
        $('#syslogOperatorAccount').attr("readonly",true);
        $('#syslogDetail').attr("readonly",true);
        $('#syslogType').attr("disabled",true);
        $('#syslogResult').attr("disabled",true);
        $('#syslogIp').attr("readonly",true);
        $('#syslogTime').attr("readonly",true);

    }
    layui.form.render("select");//重新渲染

    $(function () {
        $("#returnPage").click(function () {
            var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
            parent.layer.close(index); //再执行关闭
        });
    });

})
