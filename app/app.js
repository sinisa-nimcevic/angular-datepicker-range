(function () {
	'use strict';

	var doubleDatePicker = angular.module('doubleDatePicker', 
		['lotusGroup.directives.dateRangePicker']
	);

	doubleDatePicker.controller('MainController', ['$scope', 
		function MainController($scope){
			var vm = this;
			vm.someDates = ['', ''];
			vm.date1 = vm.someDates[0];
			vm.date2 = vm.someDates[1];

			vm.someOtherDates = ['', ''];
			vm.dateO1 = vm.someOtherDates[0];
			vm.dateO2 = vm.someOtherDates[1];
		}
	]);

})();