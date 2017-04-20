(function(angular){
  'use strict';
  angular.module('app', [
    'ngRoute',
    'app.movie_detail',
    'app.controllers.movie_list',
    ]).controller('searchController', ['$scope','$route', function ($scope,$route) {

      $scope.search = function() {
        // console.log($scope.searchContent)
        $route.updateParams({
          api_name:'search',
          q:$scope.searchContent
        })
        $scope.searchContent = "";
      }
    }]).config(['$routeProvider',function($routeProvider) {
      $routeProvider.otherwise({
        redirectTo:"/in_theaters"
      })
    }])
})(angular)
