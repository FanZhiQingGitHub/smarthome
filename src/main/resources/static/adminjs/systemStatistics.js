layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','upload','carousel'],function(){
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , upload = layui.upload
        , carousel = layui.carousel;
    var $ = layui.jquery;
    var userRegDate = [];
    var userRegNumByDate = [];
    var adminRegDate = [];
    var adminRegNumByDate = [];
    var menuName = [];
    var menuCount = [];
    var infoRegDate = [];
    var infoRegNumByDate = [];


    // //建造轮播实例
    // carousel.render({
    //     elem: '#Notice_carousel'
    //     , width: '100%' //设置容器宽度
    //     , height: '300px'
    //     , arrow: 'none' //不显示箭头
    //     , indicator: 'outside'//lay-indicator:outside
    //     , autoplay: false//自动切换
    //     , trigger: 'hover'//悬浮切换
    //     //,anim: 'updown' //切换动画方式默认左右
    // });
    // //监听轮播切换事件
    // carousel.on('change(Notice_carousel)', function (obj) { //Notice_carousel 来源于对应HTML容器的 lay-filter="Notice_carousel" 属性值
    //     obj.index === 0 ? Notice.resize() : NoticeAll.resize();
    //     //console.log(obj.index); //当前条目的索引
    //     //console.log(obj.prevIndex); //上一个条目的索引
    //     //console.log(obj.item); //当前条目的元素对象
    // });

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

    $.ajax({
        url: "/smarthome/public/userStatistics",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            userRegDate = msg.mapData.userMap;
            createUserEchars();
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    function createUserEchars() {
        var userSum = echarts.init(document.getElementById('userSum'));
        var optionUser = {
            tooltip: {
                trigger: 'axis'
                ,textStyle: {
                    fontWeight: "bolder",
                    fontSize: "18",
                    color: "#fff"
                }
            },
            legend: {
                data: ['人数']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: {
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {type: 'value'},
            series: [{
                name: '人数',
                type: 'bar',//柱状
                data: userRegDate,
                itemStyle:{
                    normal:{//柱子颜色
                        color:'#1e9fff'
                    }
                },
            }]
        };
        userSum.setOption(optionUser);
        window.onresize = function () {//用于使echarts自适应高度和宽度
            userSum.resize();
        };
    }

    $.ajax({
        url: "/smarthome/public/adminStatistics",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            adminRegDate = msg.mapData.adminMap;
            createAdminEchars();
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    function createAdminEchars() {
        var adminSum = echarts.init(document.getElementById('adminSum'));
        var optionAdmin = {
            tooltip: {
                trigger: 'axis'
                ,textStyle: {
                    fontWeight: "bolder",
                    fontSize: "18",
                    color: "#fff"
                }
            },
            legend: {
                data: ['人数']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: {
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {type: 'value'},
            series: [{
                name: '人数',
                type: 'bar',//柱状
                data: adminRegDate,
                itemStyle:{
                    normal:{//柱子颜色
                        color:'#d23711'
                    }
                },
            }]
        };
        adminSum.setOption(optionAdmin);
        window.onresize = function () {//用于使echarts自适应高度和宽度
            adminSum.resize();
        };
    }

    $.ajax({
        url: "/smarthome/public/menuStatistics",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            for(var i in msg.data){
                menuName.push(msg.data[i].menuName);
                menuCount.push(msg.data[i].children[0]);
            }
            createMenuEchars();
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    function createMenuEchars() {
        var menuSum = echarts.init(document.getElementById('menuSum'));
        var optionMenu = {
            tooltip: {
                trigger: 'axis'
                ,textStyle: {
                    fontWeight: "bolder",
                    fontSize: "18",
                    color: "#fff"
                }
            },
            legend: {
                data: ['菜单数量']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: {
                data: menuName
            },
            yAxis: {type: 'value'},
            series: [{
                name: '菜单数量',
                smooth:true,//曲线
                type: 'line',//线性
                areaStyle: {
                    color: ['rgba(70,220,230,.8)']
                },//区域颜色
                lineStyle:{//线条颜色
                    color:'#009688'
                }, itemStyle : {
                    normal : {//折点颜色
                        color:'#000'
                    }
                },
                data: menuCount,
            }]
        };
        menuSum.setOption(optionMenu);
        window.onresize = function () {//用于使echarts自适应高度和宽度
            menuSum.resize();
        };
    }

    $.ajax({
        url: "/smarthome/public/infoStatistics",
        async: true,
        type: "get",
        datatype: "text",
        success: function (msg) {
            infoRegDate = msg.mapData.infoMap;
            createInfoEchars();
        }, error: function (msg) {
            layer.msg("网络繁忙！", {icon: 2});
        }
    });

    function createInfoEchars() {
        var infoSum = echarts.init(document.getElementById('infoSum'));
        var optionInfo = {
            tooltip: {
                trigger: 'axis'
                ,textStyle: {
                    fontWeight: "bolder",
                    fontSize: "18",
                    color: "#fff"
                }
            },
            legend: {
                data: ['资讯数量']
            },
            toolbox: {
                show: true,
                feature: {
                    restore: {show: true},
                    magicType: {show: true, type: ['line', 'bar']},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: {
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
            },
            yAxis: {type: 'value'},
            series: [{
                name: '资讯数量',
                smooth:true,//曲线
                type: 'line',//线性
                areaStyle: {
                    color: ['rgba(231,105,47,0.8)']
                },//区域颜色
                lineStyle:{//线条颜色
                    color:'#e51e0d'
                }, itemStyle : {
                    normal : {//折点颜色
                        color:'#000'
                    }
                },
                data: infoRegDate,
            }]
        };
        infoSum.setOption(optionInfo);
        window.onresize = function () {//用于使echarts自适应高度和宽度
            infoSum.resize();
        };
    }



    // 基于准备好的dom，初始化echarts实例
    // var userSum = echarts.init(document.getElementById('userSum')),
    //     adminSum = echarts.init(document.getElementById('adminSum')),
    //     menuSum = echarts.init(document.getElementById('menuSum')),
    //     infoSum = echarts.init(document.getElementById('infoSum'));
    // 指定图表的配置项和数据
    // var optionUser = {
    //     tooltip: {
    //         trigger: 'axis'
    //         ,textStyle: {
    //             fontWeight: "bolder",
    //             fontSize: "18",
    //             color: "#fff"
    //         }
    //     },
    //     legend: {
    //         data: ['人数']
    //     },
    //     toolbox: {
    //         show: true,
    //         feature: {
    //             restore: {show: true},
    //             magicType: {show: true, type: ['line', 'bar']},
    //             saveAsImage: {show: true}
    //         }
    //     },
    //     calculable: true,
    //     xAxis: {
    //         data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    //     },
    //     yAxis: {type: 'value'},
    //     series: [{
    //         name: '人数',
    //         type: 'bar',//柱状
    //         data: userRegDate,
    //         itemStyle:{
    //             normal:{//柱子颜色
    //                 color:'#4ad2ff'
    //             }
    //         },
    //     }]
    // }, optionAdmin = {
    //         tooltip: {
    //             trigger: 'axis'
    //             ,textStyle: {
    //                 fontWeight: "bolder",
    //                 fontSize: "18",
    //                 color: "#fff"
    //             }
    //         },
    //         legend: {
    //             data: ['人数']
    //         },
    //         toolbox: {
    //             show: true,
    //             feature: {
    //                 restore: {show: true},
    //                 magicType: {show: true, type: ['line', 'bar']},
    //                 saveAsImage: {show: true}
    //             }
    //         },
    //         calculable: true,
    //         xAxis: {
    //             data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    //         },
    //         yAxis: {type: 'value'},
    //         series: [{
    //             name: '人数',
    //             type: 'bar',//柱状
    //             data: [820, 932, 901, 934, 1290, 1330, 1320],
    //             itemStyle:{
    //                 normal:{//柱子颜色
    //                     color:'#d50932'
    //                 }
    //             },
    //         }]
    //     }, optionMenu = {
    //     tooltip: {
    //         trigger: 'axis'//悬浮显示对比
    //     },
    //     legend: {//顶部显示 与series中的数据类型的name一致
    //         data: ['公告', '作业', '光荣榜', '成绩报告']
    //     },
    //     toolbox: {
    //         feature: {
    //             restore: {show: true},
    //             magicType: {show: true, type: ['line', 'bar']},
    //             saveAsImage: {show: true}
    //         }
    //     },
    //     calculable: true,
    //     xAxis: {
    //         type: 'category',
    //         boundaryGap: false,//从起点开始
    //         data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    //     },
    //     yAxis: {
    //         type: 'value'
    //     },
    //     series: [{
    //         name: '公告',
    //         type: 'line',//线性
    //         data: [620, 732, 701, 734, 1090, 1130, 1120],
    //     }, {
    //         name: '作业',
    //         type: 'line',//线性
    //         data: [720, 832, 801, 834, 1190, 1230, 1220],
    //     }, {
    //         smooth: true,//曲线 默认折线
    //         name: '光荣榜',
    //         type: 'line',//线性
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //     }, {
    //         smooth: true,//曲线
    //         name: '成绩报告',
    //         type: 'line',//线性
    //         data: [220, 332, 401, 534, 690, 730, 820],
    //     }]
    // }, optionInfo = {
    //     tooltip: {
    //         trigger: 'axis'//悬浮显示对比
    //     },
    //     legend: {//顶部显示 与series中的数据类型的name一致
    //         data: ['资讯数据']
    //     },
    //     toolbox: {
    //         feature: {
    //             restore: {show: true},
    //             magicType: {show: true, type: ['line', 'bar']},
    //             saveAsImage: {show: true}
    //         }
    //     },
    //     calculable: true,
    //     xAxis: {
    //         type: 'category',
    //         boundaryGap: false,//起点开始
    //         data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
    //     },
    //     yAxis: {
    //         type: 'value'
    //     },
    //     series: [{
    //         name: '资讯数据',
    //         smooth:true,//曲线
    //         type: 'line',//线性
    //         areaStyle: {
    //             color: ['rgba(70,220,230,.8)']
    //         },//区域颜色
    //         lineStyle:{//线条颜色
    //             color:'#00FF00'
    //         }, itemStyle : {
    //             normal : {//折点颜色
    //                 color:'#000'
    //             }
    //         },
    //         data: [620, 732, 701, 734, 1090, 1130, 1120],
    //     }]
    // };
    // // 使用刚指定的配置项和数据显示图表。
    // userSum.setOption(optionUser);
    // adminSum.setOption(optionAdmin);
    // menuSum.setOption(optionMenu);
    // infoSum.setOption(optionInfo);
    // window.onresize = function () {//用于使echarts自适应高度和宽度
    //     userSum.resize();
    //     adminSum.resize();
    //     menuSum.resize();
    //     infoSum.resize();
    // };

});




