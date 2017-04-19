(function(angular){
  'use strict';
  angular.module('app', [
    'ngRoute',
    'app.controllers.coming_soon',
    'app.controllers.in_theaters',
    'app.controllers.top250'
    ]).config(['$routeProvider',function($routeProvider) {
      $routeProvider.otherwise({
        redirectTo:"/in_theaters"
      })
    }])
})(angular)
