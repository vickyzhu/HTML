/**
 * Created by vickyzhu on 2016/3/14.
 */
APP.applicationController = (function(){
    'use strict';
    function offlineWarning(){
        console.log("The feature is only availble online.");
    }

    function pageNotFound(){
        alert("The page you were looking for cannot be found");
    }

    function showHome(){
        $("#body").html(APP.templates.home());

        //  Load up the last cached copy of the news
        APP.articlesController.showArticleList();

        $('#refreshButton').click(function(){

            //  if the user is offline,don't bother trying to synchronize
            console.log("network state:"+navigator.onLine);
            if( navigator && navigator.onLine === false){
                offlineWarning();
            } else {
                //console.log("synchronize");
                APP.articlesController.synchronizeWithServer(offlineWarning);
            }
            return false;
        });
    }

    function showArticle(id){
        $('#body').html(APP.templates.articleLoading());
        APP.articlesController.showArticle(id);
    }

    function route(){
        var page = window.location.hash;
        if(page){
            page = page.substring(1);
            if(parseInt(page,10)>0){
                showArticle(page);
            } else {
                pageNotFound();
            }
        }else{
            showHome();
        }
    }

    //  This is to  our webapp what main() is to C,$(document).ready is to jQuery,app.js to nodeJs ,etc
    function start(resources,storeResources){
        APP.database.open(function(){
            //Listen to the hash tag changing
            $(window).bind('hashchange',route);

            // Inject CSS Into the DOM
            $("head").append("<style>" + resources.css + "</style>");

            //Create app elements
            $('body').html(APP.templates.application());

            //  Remove our loading splash screen
            $('#loading').remove();

            route();
        });
        if (storeResources) {
            localStorage.resources = JSON.stringify(resources);
        }
    }

    return {
        start : start
    };
}());