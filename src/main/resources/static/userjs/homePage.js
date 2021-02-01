layui.use(['form', 'layer', 'jquery', 'layedit', 'laydate','element','carousel','laypage'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element
        , laypage = layui.laypage
        , carousel = layui.carousel;
    var $ = layui.jquery;

    //轮播渲染
    carousel.render({
        elem: '#banner'
        ,width: '100%'
        ,height: '898px'
        ,arrow: 'always'
    });

    //滚动监听
    $(window).scroll(function() {
        var scr=$(document).scrollTop();
        scr > 0 ? $(".nav").addClass('scroll') : $(".nav").removeClass('scroll');
    });


    //导航切换
    var btn = $('.nav').find('.nav-list').children('button')
        ,spa = btn.children('span')
        ,ul = $('.nav').find('.nav-list').children('.layui-nav');
    btn.on('click', function(){
        if(!$(spa[0]).hasClass('spa1')){
            spa[0].className = 'spa1';
            spa[1].style.display = 'none';
            spa[2].className = 'spa3';
            $('.nav')[0].style.height = 90 + ul[0].offsetHeight + 'px';
        }else{
            spa[0].className = '';
            spa[1].style.display = 'block';
            spa[2].className = '';
            $('.nav')[0].style.height = 80 + 'px';
        }
    });

    //关于内容
    $('.main-about').find('.aboutab').children('li').each(function(index){
        $(this).on('click', function(){
            $(this).addClass('layui-this').siblings().removeClass('layui-this');
            $('.aboutab').siblings().fadeOut("fast");
            $('.aboutab').siblings().eq(index).fadeIn("");
        });
    });

    //动态分页
    laypage.render({
        elem: 'newsPage'
        ,count: 50
        ,theme: '#2db5a3'
        ,layout: ['page', 'next']
    });

    //案例分页
    laypage.render({
        elem: 'casePage'
        ,count: 50
        ,theme: '#2db5a3'
        ,layout: ['page', 'next']
    });

    //新闻字段截取
    $(function(){
        $(".main-news").find(".content").each(function(){
            var span = $(this).find(".detail").children("span")
                ,spanTxt = span.html();
            if(document.body.clientWidth > 463){
                span.html(spanTxt);
            }else{
                span.html(span.html().substring(0, 42)+ '...')
            };
            $(window).resize(function(){
                if(document.body.clientWidth > 463){
                    span.html(spanTxt);
                }else{
                    span.html(span.html().substring(0, 42)+ '...')
                };
            });
        }),$("#userLogin").click(function () {
            location.href = "/smarthome/user/path/userLogin";
        }),$("#a1").click(function () {
            window.open("https://www.baidu.com");
        }), $("#a2").click(function () {
            window.open("https://www.bilibili.com");
        }),$("#a3").click(function () {
            layer.open({
                title: '使用条款'
                ,
                content: '本应用深知个人信息对您的重要性，并会尽全力保护您的个人信息安全可靠。我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等。同时，我们承诺，我们将按业界成熟的安全标准，采取相应的安全保护措施来保护您的个人信息。 请在使用我们的产品（或服务）前，仔细阅读并了解本《隐私权政策》。\n' +
                    '\n' +
                    '作者：Mr.Fan\n' +
                    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。'
            });
        }), $("#a4").click(function () {
            layer.open({
                title: '隐私保护'
                , content: '' +
                    '感谢您的支持，我们会重视您在体验中的个人隐私。同时您在使用我们的产品时，我们可能会收集和使用您的相关信息。我们希望通过本《隐私政策》向您说明，在使用我们的服务时，我们如何收集、使用、储存这些信息，以及我们为您提供的访问、更新、控制和保护这些信息的方式。本《隐私政策》与您所使用的本产品服务息息相关，希望您仔细阅读，在需要时，按照本《隐私政策》的指引，作出您认为适当的选择。本《隐私政策》中涉及的相关技术词汇，我们尽量以简明扼要的表述，以便您的理解。\n' +
                    '\n' +
                    '如对本《隐私政策》或相关事宜有任何问题，请通过smarthome@outlook.com与我们联系。\n' +
                    '\n' +
                    '作者：最后#的小组\n' +
                    '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。'
            });
        }),$("#a5").click(function () {
            layer.open({
                title: $("#p1").text(),
                content: $("#p2").text()
            });
        }), $("#a6").click(function () {
            layer.open({
                title: $("#p3").text(),
                content: $("#p4").text()
            });
        }),$("#a7").click(function () {
            layer.open({
                title: $("#p5").text(),
                content: $("#p6").text()
            });
        }), $("#a8").click(function () {
            layer.open({
                title: $("#p7").text(),
                content: $("#p8").text()
            });
        });
    });



});

