var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ui.bootstrap']);

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
            .when('/about', {
                templateUrl: 'partials/about.html',
                controller: 'AboutController'
            })
            // Default Page
            .otherwise({
                redirectTo: '/home'
            });
    }
]);