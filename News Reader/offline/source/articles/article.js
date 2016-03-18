/**
 * Created by vickyzhu on 2016/3/14.
 */
APP.article = (function(){
    'use strict';

    function deleteArticles(successCallback){
        APP.database.runQuery("DELETE FROM articles",[],successCallback);
    }

    function insertArticles(articles,successCallback){
        var remaining = articles.length, i, l,data = [];
        if(remaining === 0){
            successCallback();
        }
        //    Covert articles array of objects to array of arrays
        var _len = articles[0].item.length;

        for(var i =0;i<_len;i++){
            //console.log(articles[0].item[i]);
            articles[0].item[i].title = "李克强：可以稳定中国经济的运行";
            articles[0].item[i].date = articles[0].item[i].pubDate;
            data[i] = [articles[0].item[i].date,articles[0].item[i].title];
        }
        APP.database.runQuery("INSERT INTO articles(date,headline) VALUES (?,?);", data, successCallback);
        //for(i = 0, l = articles.length; i<1; i++){
        //    console.log(articles[i]);
        //    data[i] = [articles[i].id, articles[i].date, articles[i].headline, articles[i].author, articles[i].body];
        //}

        //APP.database.runQuery("INSERT INTO articles(id,date, headline, author, body) VALUES (?, ?, ?, ?, ?);", data, successCallback);
    }

    function selectBasicArticles(successCallback){
        APP.database.runQuery("SELECT id, headline, date FROM articles",[],successCallback);
    }

    function selectFullArticle(id, successCallback){
        APP.database.runQuery("SELECT id, headline, date FROM articles WHERE id = ?", [id],successCallback);
    }

    return {
        insertArticles : insertArticles,
        selectBasicArticles : selectBasicArticles,
        selectFullArticle : selectFullArticle,
        deleteArticles : deleteArticles
    }
}());