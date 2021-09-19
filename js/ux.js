$(function(){
    navbar();
    // scroll_xg();
})

function navbar(){
    var width = $(window).outerWidth();
    var topimghg = $('#nav-img').outerHeight();  //获取头部头部图片的高度
    var navbarhg = $("#top-nav").outerHeight();  //获取导航高度
    if($(window).scrollTop() > topimghg - navbarhg){
            $("#top-nav").addClass('bg-dark');
    }else{
        if(width < 768){
            $("#top-nav").addClass('bg-dark');
        }else{
            $("#top-nav").removeClass('bg-dark');
        }
    }

    $(window).resize(function(){
        var width = $(window).outerWidth();
        if(width < 768){
            $("#top-nav").addClass('bg-dark');
        }
        else{
            var topimghg = $('#nav-img').outerHeight();  //获取头部头部图片的高度
            if($(window).scrollTop() < topimghg - navbarhg){
                $("#top-nav").removeClass('bg-dark');
            }
        }
    });

    $(window).scroll(function(){
        var topimghg = $('#nav-img').outerHeight();  //获取头部头部图片的高度
        if($(window).scrollTop() > topimghg - navbarhg *1.5){
            $("#top-nav").addClass('bg-dark');
        }else{
            var width = $(window).outerWidth();
            if(width > 768){
                $("#top-nav").removeClass('bg-dark');
            }
        }
    })
}

function scroll_xg(){
    $(window).scroll(function(){
        $("html,body").animate($(window).scrollTop(),5000);
    })
}