(function(angular) {
    'use strict';
    angular.module('app.controllers.movie_list', ['ngRoute', 'app.services.httpService']).
    controller('movie_list', ['$scope', '$window', 'httpService', '$route', '$routeParams', function($scope, $window, httpService, $route, $routeParams) {
        $scope.loading = true;


        var url = "http://api.douban.com/v2/movie/" + $routeParams.api_name;
        //页码

        $scope.pageNum = $routeParams.pageNum || 1;
        var count = 20;
        var queryParams = {
            start: ($scope.pageNum - 1) * count,
            count: count,
            q:$routeParams.q

        };
        $scope.changePage = function(pNum) {
                $scope.pageNum = pNum;
                if (pNum <= 1) {
                    $scope.pageNum = 1;
                } else if (pNum >= $scope.maxPage) {
                    $scope.pageNum = $scope.maxPage;
                }
                $route.updateParams({ pageNum: $scope.pageNum });
            }
            // 随机生成回调函数名称
        var callbackName = "callbacks_" + Math.random();
        callbackName = callbackName.toString().replace(".", "");
        $window[callbackName] = function(data) {
            $scope.subjects = data.subjects;
            $scope.total = data.total;
            // console.log($scope.subjects);
            $scope.maxPage = Math.ceil($scope.total / count);
            $scope.loading = false;
            $scope.$apply('subjects');
            //加载获取到数据后删除script标签（优化页面  负责页面堆积script）
            var del = $window.document.querySelector("#kuayu");
            del.remove();
        }
        $scope.subjects = httpService.http(url, queryParams, callbackName);
    }]).config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/:api_name/:pageNum?", {
            controller: "movie_list",
            templateUrl: "/movie/app/movie_list/view.html"
        })
    }])
})(angular);
