(function(angular) {
  'use strict';
  angular.module('app.movie_detail', ['ngRoute','app.services.httpService']).
    controller('movie_detail', ['$scope','$window','$routeParams','httpService', function ($scope,$window,$routeParams,httpService) {
        var Url = 'http://api.douban.com/v2/movie/subject/' + $routeParams.movieId;
        //随机生成函数名
        var callbackName = "callbacks_" + Math.random();
        callbackName = callbackName.toString().replace(".","");
        $window[callbackName] = function (data) {
          $scope.movie = data;
          console.log($scope.movie)
          $scope.$apply('movie');
          var sc = $window.document.querySelector("#kuayu");
          sc.remove();
        }
      httpService.http(Url,{},callbackName);

    }]).config(['$routeProvider',function ($routeProvider) {
      $routeProvider.when("/movie_detail/:movieId",{
        controller:"movie_detail",
        templateUrl:"/movie/app/movie_detail/detail_view.html"
      })
    }])
})(angular)
