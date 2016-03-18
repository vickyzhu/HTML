/**
 * Created by vickyzhu on 2016/3/14.
 */
APP.articlesController = (function(){
    'use strict';

    function showArticleList(successCallback){
        APP.article.selectBasicArticles(function(articles){
            $("#headlines").html(APP.templates.articleList(articles));
        });
    }

    function showArticle(id,successCallback){
        APP.article.selectFullArticle(id,function(articles){
            console.log("id-articles:"+articles);
            $('#body').html(APP.templates.article(articles))
        });
    }

    function synchronizeWithServer(failureCallback){
        $.ajax({
            type : 'get',
            dataType : 'json',
            url: 'api/articles',
            success : function(articles){
                articles = [articles];
                APP.article.deleteArticles(function(){
                    APP.article.insertArticles(articles,function(){
                        console.log("syncronzieWithServer:"+articles)
                        $("#headlines").html(APP.templates.articleListWithServer(articles));
                    });
                });
            },
            error : function(e){
                console.log("error:");
                if(failureCallback){
                    failureCallback();
                }
            }
        });
    }

    return {
        synchronizeWithServer : synchronizeWithServer,
        showArticleList : showArticleList,
        showArticle : showArticle
    }
}());