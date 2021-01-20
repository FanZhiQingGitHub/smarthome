layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload','carousel'], function () {
	var form = layui.form
		, layer = layui.layer
		, layedit = layui.layedit
		, laydate = layui.laydate
		, element = layui.element
		, upload = layui.upload
		, carousel = layui.carousel;
	var $ = layui.jquery;

	function timeTimer() {
		//实例化日期对象
		var dateInfo = new Date();
		//.innerHTML是dom里面的方法（获取对象的内容  或  向对象插入内容，可以直接在网页上显示）
		document.getElementById("sysTime").innerHTML = dateInfo.toLocaleDateString()+"&nbsp"+"&nbsp"+"&nbsp"+dateInfo.toLocaleTimeString();
	}
	setInterval(function() {timeTimer()},1000);

});

