var mainModule = angular.module("movieApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/movielist", {
            templateUrl: "/views/movielist.html"
        });
        $routeProvider.otherwise({
            templateUrl: "/views/movielist.html"
        });
    });