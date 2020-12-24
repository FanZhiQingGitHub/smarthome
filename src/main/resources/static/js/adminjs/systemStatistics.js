layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload','carousel'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;

    //建造轮播实例
    carousel.render({
        elem: '#Notice_carousel'
        , width: '100%' //设置容器宽度
        , height: '300px'
        , arrow: 'none' //不显示箭头
        , indicator: 'outside'//lay-indicator:outside
        , autoplay: false//自动切换
        , trigger: 'hover'//悬浮切换
        //,anim: 'updown' //切换动画方式默认左右
    });
    //监听轮播切换事件
    carousel.on('change(Notice_carousel)', function (obj) { //Notice_carousel 来源于对应HTML容器的 lay-filter="Notice_carousel" 属性值
        obj.index === 0 ? Notice.resize() : NoticeAll.resize();
        //console.log(obj.index); //当前条目的索引
        //console.log(obj.prevIndex); //上一个条目的索引
        //console.log(obj.item); //当前条目的元素对象
    });

    $.ajax({
        url: "/smarthome/public/findAllCount",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            if (msg.code == "200") {
                $("#userCount").text(msg.mapData.userCount);
                $("#adminCount").text(msg.mapData.adminCount);
                $("#menuCount").text(msg.mapData.menuCount);
                $("#infoCount").text(msg.mapData.infoCount);
            }else if(msg.code == "500" || msg.code == "501"){
                layer.msg(msg.message, {icon: 2});
            }
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });





    // 基于准备好的dom，初始化echarts实例
    var Shopping = echarts.init(document.getElementById('Shopping')),
        Notice = echarts.init(document.getElementById('Notice')),
        NoticeAll = echarts.init(document.getElementById('NoticeAll')),
        UserSum = echarts.init(document.getElementById('UserSum'));
    // 指定图表的配置项和数据
    var optionShopping = {
        title: {
            text: '商品订单'
        },
        tooltip: {},
        legend: {
            data: ['销量']
        },
        xAxis: {
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {type: 'value'},
        series: [{
            name: '销量',
            type: 'bar',//柱状
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            itemStyle:{
                normal:{//柱子颜色
                    color:'#4ad2ff'
                }
            },
        }]
    }, optionNotice = {
        title: {
            text: '公告'
        },
        tooltip: {
            trigger: 'axis'//悬浮显示对比
        },
        legend: {//顶部显示 与series中的数据类型的name一致
            data: ['公告', '作业', '光荣榜', '成绩报告']
        },
        toolbox: {
            feature: {
                saveAsImage: {}//保存图片下载
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,//从起点开始
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '公告',
            type: 'line',//线性
            data: [620, 732, 701, 734, 1090, 1130, 1120],
        }, {
            name: '作业',
            type: 'line',//线性
            data: [720, 832, 801, 834, 1190, 1230, 1220],
        }, {
            smooth: true,//曲线 默认折线
            name: '光荣榜',
            type: 'line',//线性
            data: [820, 932, 901, 934, 1290, 1330, 1320],
        }, {
            smooth: true,//曲线
            name: '成绩报告',
            type: 'line',//线性
            data: [220, 332, 401, 534, 690, 730, 820],
        }]
    },optionNoticeAll = {
        title: {
            text: '发布类型汇总',
            subtext: '纯属虚构',//副标题
            x: 'center'//标题居中
        }     ,       tooltip: {
            trigger: 'item'//悬浮显示对比
        },
        legend: {
            orient: 'vertical',//类型垂直,默认水平
            left: 'left',//类型区分在左 默认居中
            data: ['公告', '作业', '光荣榜', '成绩报告']
        },
        series: [
            {
                type: 'pie',//饼状
                radius: '60%',//圆的大小
                center: ['50%', '50%'],//居中
                data: [
                    { value: 335, name: '公告' },
                    { value: 310, name: '作业' },
                    { value: 234, name: '光荣榜' },
                    { value: 135, name: '成绩报告' }
                ]
            }
        ]
    }, optionUserSum = {
        title: {
            text: '用户数量'
        },
        tooltip: {
            trigger: 'axis'//悬浮显示对比
        },
        legend: {//顶部显示 与series中的数据类型的name一致
            data: ['用户数据']
        },
        toolbox: {
            feature: {
                saveAsImage: {}//保存图片下载
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,//起点开始
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '用户数据',
            smooth:true,//曲线
            type: 'line',//线性
            areaStyle: {
                color: ['rgba(70,220,230,.8)']
            },//区域颜色
            lineStyle:{//线条颜色
                color:'#00FF00'
            }, itemStyle : {
                normal : {//折点颜色
                    color:'#000'
                }
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120],
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    Shopping.setOption(optionShopping);
    Notice.setOption(optionNotice);
    NoticeAll.setOption(optionNoticeAll);
    UserSum.setOption(optionUserSum);
    window.onresize = function () {//用于使echarts自适应高度和宽度
        Shopping.resize();
        Notice.resize();
        NoticeAll.resize();
        UserSum.resize();
    };
    //var myChart = echarts.init(document.getElementById('main'));
    //// 显示标题，图例和空的坐标轴
    //myChart.setOption({
    //    title: {
    //        text: '异步数据加载示例'
    //    },
    //    tooltip: {},
    //    legend: {
    //        data: ['统计']
    //    }
    //});
    //$.post('?', { type: 'test' }, function (data) {
    //    //console.log(data.data);
    //    var arrnum = data.data.value.split(',');
    //    var title_color = data.data.categories.split(',');
    //    myChart.setOption({
    //        xAxis: {
    //            data: title_color
    //        },
    //        yAxis: {},
    //        series: [{
    //            name: "统计",
    //            type: 'bar',
    //            data: arrnum
    //        }]
    //    });
    //}, 'json');
});




