myApp.controller('HomeController', function($scope) {
	// Set animation class
	$scope.pageClass = 'home';
	
	
	// Carousel Slider
	$scope.myInterval = 5000;
	$scope.noWrapSlides = false;
	$scope.slides = ["/images/image1.jpg", "/images/image2.png", "/images/image3.png"];
	
}); //MainController
