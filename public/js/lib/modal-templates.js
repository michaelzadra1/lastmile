(function(){
	angular.module('modaltemplate', []).run(['$templateCache', function($templateCache) {
	  $templateCache.put('partials/modal.html',
	  '<div class="modal-header">\n' +
		'  <button type="button" class="close" ng-click="ModalController.cancel()" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
		'  <h4 class="modal-title">Login</h4>\n' +
		'</div>\n' +
		'<div class="modal-body">\n' +
		'	<form class="form-inline" ng-submit="ModalController.submit(_email, _password)">\n' +
		'	  <div class="form-group col-xs-5">\n' +
		'	    <input type="email" ng-model="_email" class="form-control" placeholder="Enter email" />\n' +
		'   </div>\n' +
		'	  <div class="form-group col-xs-5">\n' +		
		'	    <input type="password" ng-model="_password" class="form-control" placeholder="Enter password" />\n' +
		'   </div>\n' +
		'	  <button class="btn btn-primary col-xs-2">Submit</button>\n' +
		'	</form>\n' +
		'</div>\n' +
		'<div class="modal-footer">\n' +
		'  <button class="btn btn-warning"  ng-click="ModalController.cancel()">Cancel</button>\n' +
		'</div>\n' +
		'');
	}]);

})();