(function(angular){
  angular.module('app.services.httpService',[]).
    service('httpService',['$window','$document',function($window,$document){
      this.http=function(url,data,callback){
        var queryParams = "?";
        // console.log(url,data)
        for(var key in data){
            queryParams += key + "=" + data[key] + "&";
        }
        queryParams += "callback=" + callback;
        url += queryParams;
        var ele = $document[0].createElement("script");
        ele.src = url;
        $document[0].body.append(ele);
      }
    }])
})(angular)
