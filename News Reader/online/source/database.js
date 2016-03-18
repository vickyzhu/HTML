/**
 * Created by vickyzhu on 2016/3/14.
 */
APP.database = (function(){
    'use strict';
    var smallDatabase;
    function runQuery(query,data,successCallback){
        var i, l,remaining;
        if(!(data[0] instanceof Array )){
            data = [data];
        }

        remaining = data.length;

        function innerSuccessCallback(tx,rs){
            //console.log("success create");
            var i, l,output = [];
            remaining = remaining - 1;
            //console.log("remaining:"+remaining);
            if(!remaining){
                // HACK Convert row object to an array to make our lives easier
                for(i = 0,l = rs.rows.length;i<l;i++){
                    output.push(rs.rows.item(i));
                }
                //console.log("output:"+output);
                if(successCallback){
                    successCallback(output);
                }
            }

        }

        function errorCallback(tx,e){
            //console.log("e:"+ e.message)
            //console.dir(e);
            console.trace(e);
            //alert("an error has occurred");
        }

        smallDatabase.transaction(function(tx){
            //console.log("data:"+data[0]);
            for(i = 0, l = data.length; i < l; i++){
                tx.executeSql(query,data[i],innerSuccessCallback,errorCallback);
            }
        });
    }
    function open(successCallback){
        smallDatabase = openDatabase("APP","1.0","Not The FT Web App",(5 * 1024 * 1024));
        runQuery("CREATE TABLE IF NOT EXISTS articles(id INTEGER PRIMARY KEY ASC,date,headline TEXT)",[],successCallback);
    }

    return {
        open : open,
        runQuery : runQuery
    }

}());