myApp.controller('ModalController', function($scope, loginModalService) {
  
	this.cancel = $scope.$dismiss;
	$scope.showModal = function () {
	    loginModalService()
	         .then(function () {
	             alert("OK Selected ");
	             //return $state.go(toState.name, toParams);
	         })
	         .catch(function () {
	             console.log("User Cancelled Login hence Navigation Cancelled ");
	             //return $state.go('home');
	         });
	}
	this.submit = function (email, password) {
	    //  UsersApi.login(email, password).then(function (user) {
	    //      $scope.$close(user);
	    //  });
	    $scope.$close("abc");
	};
}); //ModalDemoController