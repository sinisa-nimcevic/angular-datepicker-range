(function () {
	'use strict';

    var module;
    try {
        module = angular.module('lotusGroup.directives.dateRangePicker');
    } catch (err) {
        module = angular.module('lotusGroup.directives.dateRangePicker', []);
    }

    module.directive('dateRangePicker', dateRangePicker);
    
    function dateRangePicker() {
    	return {
    		templateUrl : 'date-range-picker.html',
    		scope : {
    			dateFrom: '=dateFrom',
    			dateTo: '=dateTo',
    			fromText: '@fromText',
    			toText: '@toText'
    		},
    		link : function (scope, element, attrs) {
    			// link function
    		},
    		controller: function($scope, $timeout) {
    			$timeout(function(){ //do controller inside $timeout to work with jquery ui after dom changes
	    			var vm = $scope;

	    			vm.dateFrom = vm.dateFrom || "";
	    			vm.dateTo = vm.dateTo || "";
	    			vm.days = 0;
	    			vm.fromText = vm.fromText || "From : ";
	    			vm.toText = vm.toText || "To : ";

					vm.setDateModel = function(i, date) {
						i == 0 ? vm.dateFrom = date : vm.dateTo = date;			
						if (vm.dateFrom.length > 0 && vm.dateTo.length > 0) {
							var a = new Date(vm.dateFrom);
							var b = new Date(vm.dateTo);

							vm.days = Math.round(Math.abs((a.getTime() - b.getTime())/(24*60*60*1000)));	
						} else {
							vm.days = 0;	
						}
						$scope.$apply();			
					}

					vm.init = function() {	
						$('.datepicker-hidden--' + $scope.$id).datepicker({
							minDate: new Date(),
							maxDate: "+2y",
							firstDay: 1,
							dateFormat: "D d MM yy",
							numberOfMonths: 2,
							onSelect: function(selectedDate) {
								// general variables
								var clickedDate = $.datepicker.parseDate( "D d MM yy", selectedDate );
								var fromDate = $.datepicker.parseDate( "D d MM yy", vm.dateFrom );
								var toDate = $.datepicker.parseDate( "D d MM yy", vm.dateTo );
								var reset = false;
								var origin = vm.origin || 'from';

								// check if it's a click on an existing date (reset a value and end the loop)
								if (vm.dateFrom.length > 0) {
									var compare = new Date(vm.dateFrom);
									if (clickedDate.getTime() == compare.getTime()) {															
										vm.setDateModel(0, '');
										reset = true;
									}
								}

								if (vm.dateTo.length > 0) {
									var compare = new Date(vm.dateTo);
									if (clickedDate.getTime() == compare.getTime()) {															
										vm.setDateModel(1, '');
										reset = true;
									}
								}


								// add new value because selected date isn't an existing one
								if (!reset) {
									// if no "from" value is set, and you navigated from a "from" field
									if (vm.dateFrom.length == 0 && origin == 'from') {	
										if (vm.dateTo.length == 0) { 
											vm.setDateModel(0, selectedDate);
										} else { // handle existing "to" field
											var compareTo = new Date(vm.dateTo);
											var compareClicked = new Date(selectedDate);

											if (compareTo.getTime() < compareClicked.getTime()) {
												vm.setDateModel(0, vm.dateTo);
												vm.setDateModel(1, selectedDate);
											} else { vm.setDateModel(0, selectedDate); }
										}
									} 
									// if no "to" value is set, and you navigated from a "to" field
									else if (vm.dateTo.length == 0 && origin == 'to') {
										vm.setDateModel(1, selectedDate);
									}
									//if both a "from" and a "to" value are set
									else {
										// assume the user is trying to modify the "to" date		
										if (clickedDate > fromDate) {
											vm.setDateModel(1, selectedDate);
										}
										// assume user is trying to extend the "from" date
										if (clickedDate < fromDate) { 
											// allow reverse selection, first the "to" and then the "from" date
											if (vm.dateTo.length == 0) {
												vm.setDateModel(1, vm.dateFrom);
												vm.setDateModel(0, selectedDate);						
											} else {
												vm.setDateModel(0, selectedDate);
											}								
										}
									}		
								}
								// code to leave the datepicker initialized after click
								$(this).data('datepicker').inline = true;
							},
							onClose: function () {
								// code to leave the datepicker initialized after click
								$(this).data('datepicker').inline = false;
							}, 
							beforeShowDay: vm.highlightDays
						});
					}

					vm.highlightDays = function (date) {
						var from = new Date(vm.dateFrom), to = new Date(vm.dateTo);
				        for (var i = 0; i < 2; i++) {
				            if (date >= from && date <= to || date.getTime() == from.getTime() || date.getTime() == to.getTime()) {              
				                return [true, 'from-to-highlight'];
				            }
				        }
				        return [true, ''];			
					}

					vm.showDatePicker = function(e, origin) {
						var top = $(e.target)[0].offsetTop, left = $(e.target)[0].offsetLeft;
						$('.daterange-module--' + $scope.$id + ' .datepicker-hidden--' + $scope.$id).css({left: left, top: top});
						$('.daterange-module--' + $scope.$id + ' .datepicker-hidden--' + $scope.$id).datepicker('show');
						vm.origin = origin;
					}

	    			vm.init();
    			}); //end $timeout			
    		}
    	}
    }

})();