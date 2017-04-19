(function(angular){
  'use strict';
  angular.module('app.controllers.coming_soon', ['ngRoute','app.services.httpService']).
    controller('coming_soon', ['$scope','$window','httpService' ,function($scope,$window,httpService){
    //向本地data.json请求获取数据
       // $http({
       //  method : 'GET',
       //  url : '/movie/app/coming_soon/data.json'
       // }).then(function successCallback(response){
       //    console.log(response)
       //    $scope.subjects=response.data.subjects;
       // }, function errorCallback(response){
       //    console.log('wo')
       // })


    //通过API请求数据
      var url = "http://api.douban.com/v2/movie/coming_soon";
      var queryParams = {
        start:0,
        count:10
      };
        //随机生成回调函数名称
        var callbackName = "callbacks_"+Math.random();
        callbackName=callbackName.toString().replace('.','');
        $window[callbackName]=function(data){
          $scope.subjects=data.subjects;
          $scope.$apply('subjects');
        }
        $scope.subjects=httpService.http(url,queryParams,callbackName);

    }]).config(['$routeProvider',function($routeProvider) {
      $routeProvider.when("/coming_soon", {
        controller:"coming_soon",
        templateUrl:"/movie/app/coming_soon/view.html"
      })
    }])
})(angular);
