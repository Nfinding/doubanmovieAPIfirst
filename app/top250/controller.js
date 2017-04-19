(function(angular){
  'use strict';
  angular.module('app.controllers.top250', ['ngRoute','app.services.httpService']).
    controller('top250', ['$scope', '$window','httpService',function($scope,$window,httpService){
      var url = "http://api.douban.com/v2/movie/top250";
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
      $routeProvider.when("/top250", {
        controller:"top250",
        templateUrl:"/movie/app/top250/view.html"
      })
    }])
})(angular);
