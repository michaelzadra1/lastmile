var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'angular.filter']);

// Routing

myApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider
            .when('/home', {
                templateUrl: 'partials/home.html',
                controller: 'HomeController'
            })
            .when('/search', {
                templateUrl: 'partials/search.html',
                controller: 'SearchController'
            })
            .when('/carDetails/:carId', {
                templateUrl: 'partials/carDetails.html',
                controller: 'SearchController'
            })
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutController'
            })
            .otherwise({
                redirectTo: '/home'
            });
    }
]);