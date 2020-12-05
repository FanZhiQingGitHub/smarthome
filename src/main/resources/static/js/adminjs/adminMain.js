layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
    $ = layui.jquery;

    $("#adminName").text( window.sessionStorage.getItem("adminName"));

    $(function () {
        $("#exitPage").click(function () {
            layer.confirm('您确定要退出到登录界面吗?', {icon: 3, title: '温馨提示'}, function (index) {
                layer.close(index);
                sessionStorage.clear();//清除session信息
                location.href = "/smarthome/admin/path/adminLogin";
            });
        });
    });

});