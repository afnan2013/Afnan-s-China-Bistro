(function (global) {


angular.module("LunchCheckApp", [])
	.controller("LunchCheckController", LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.lunch = "";
		$scope.message = "The message will be here";
		$scope.checkTooMuch = function () {
			var lunch_menu = $scope.lunch;
			if (lunch_menu != ""){
				lunch_menu = lunch_menu.split(',');
				if (lunch_menu.length > 3){
					$scope.message = "Too much!";
				}
				else{
					$scope.message = "Enjoy!"
				}
			}
			else{
				$scope.message = "Please enter data first!"
			}
		}
	}


})(window);