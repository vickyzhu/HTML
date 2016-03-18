/**
 * Created by vickyzhu on 2016/3/14.
 */
APP.templates = (function(){
    'use strict';
    function application(){
        return '<div id="window"><div id="header"><h1>FT Tech Blog</h1></div><div id="body"></div></div>';
    }

    function home(){
        return '<button id="refreshButton">刷新新闻</button><div id="headlines"></div></div>';
    }
    //获取文章列表
    function articleList(articles){
        var i, l,output = '';
        if(!articles.length){
            return '<p><i>No articles have been found,maybe you haven\'t <b>refreshed the news</b>?</i></p>';
        }
        for(i=0,l=articles.length;i<l;i++){
            output = output+'<li><h2><a href="#'+articles[i].id +'">'+articles[i].headline+'</a></h2>'+
                '<p class="byline">发表日期：'+articles[i].date+'</li>';
        }
        return '<ul>'+output+'</ul>';
    }
    function articleListWithServer(articles){
        var i, l,output = '';
        if(!articles.length){
            return '<p><i>No articles have been found,maybe you haven\'t <b>refreshed the news</b>?</i></p>';
        }
        var _len = articles[0].item.length;

        for(var i =0;i<_len;i++){
            //console.log(articles[0].item[i]);
            articles[0].item[i].title = "李克强：可以稳定中国经济的运行";
            articles[0].item[i].date = articles[0].item[i].pubDate;
            //data[i] = [articles[0].item[i].date,articles[0].item[i].title];

            output = output+'<li><h2><a href="#">'+articles[0].item[i].title+'</a></h2>'+
                '<p class="byline">发表日期：'+ articles[0].item[i].date+'</li>';
        }
        //for(i=0,l=articles.length;i<l;i++){
        //    output = output+'<li><h2><a href="#'+articles[i].id +'">'+articles[i].headline+'</a></h2>'+
        //        '<p class="byline">发表日期：'+articles[i].date+'</li>';
        //}
        return '<ul>'+output+'</ul>';
    }
    //获取文章详情
    function article(articles){
        //   if NULL,redirect to an error
        if(!articles[0]){
            window.location = '#error';
        }
        return '<a href="#">回到首页</a><h2>'+articles[0].headline+'</h2><h3>发表日期：'+articles[0].date+'</h3>'+articles[0].body;
    }

    function articleLoading(){
        return '<a href="#">回到首页</a><br/>Please wait&hellip;';
    }

    return {
        application : application,
        home : home,
        articleList : articleList,
        article : article,
        articleLoading : articleLoading,
        articleListWithServer :articleListWithServer

    };

}());