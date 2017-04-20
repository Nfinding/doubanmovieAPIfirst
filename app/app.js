(function(angular){
  'use strict';
  angular.module('app', [
    'ngRoute',
    'app.controllers.movie_list',
    ]).config(['$routeProvider',function($routeProvider) {
      $routeProvider.otherwise({
        redirectTo:"/in_theaters"
      })
    }])
})(angular)
