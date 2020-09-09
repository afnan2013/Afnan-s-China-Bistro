(function (global) {


angular.module("LunchCheck", [])
	.controller("LunchCheckController", LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController($scope) {
		$scope.lunch = "";
		$scope.message = "";
		$scope.checkTooMuch = function () {
			var lunch_menu = $scope.lunch;
			if (lunch_menu != ""){
				lunch_menu = lunch_menu.split(',');
				var count = 0;
				for (var i =0; i< lunch_menu.length; i++){
					if (lunch_menu[i].trim() != ""){
						count++;
					}
				}
				if (count > 3){
					$scope.message = "Too much!";
					$scope.color = "red";
				}
				else{
					$scope.message = "Enjoy!";
					$scope.color = "green";
				}
			}
			else{
				$scope.message = "Please enter data first!"
				$scope.color = "red";
			}
		}
	}


})(window);