(function(angular){
  'use strict';
  angular.module('app.controllers.in_theaters', ['ngRoute','app.services.httpService']).
    controller('in_theaters', ['$scope','$window','httpService', function($scope,$window,httpService){
      var url="http://api.douban.com/v2/movie/in_theaters";
      var queryParams={
        start:0,
        count:20
      };
      // 随机生成回调函数名称
        var callbackName="callbacks_"+Math.random();
        callbackName=callbackName.toString().replace(".","");
        $window[callbackName]=function(data){
          $scope.subjects=data.subjects;
          // console.log($scope.subjects);
          $scope.$apply('subjects');

        }
     $scope.subjects= httpService.http(url,queryParams,callbackName);
    }]).config(['$routeProvider',function($routeProvider) {
      $routeProvider.when("/in_theaters", {
        controller:"in_theaters",
        templateUrl:"/movie/app/in_theaters/view.html"
      })
    }])
})(angular);
