(function () {
	'use strict';

	var doubleDatePicker = angular.module('doubleDatePicker', 
		['lotusGroup.directives.dateRangePicker']
	);

	doubleDatePicker.controller('MainController', ['$scope', 
		function MainController($scope){
			var vm = this;
			
			vm.dateFrom = '';
			vm.dateTo = '';

 			vm.dateFromX = '';
			vm.dateToX = '';
		}
	]);

})();