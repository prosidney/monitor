(function(){
	angular.module('monitor', ["ui.router", "directive.alerts.table"])
		.config(function($stateProvider, $urlRouterProvider){
	      
	      // For any unmatched url, send to /main
	      $urlRouterProvider.otherwise("/main")
	      
	      $stateProvider
	      .state('main', {
	            url: "/main",
	            templateUrl: "views/main.html"
	        })	      
	        .state('alerts', {
	            url: "/alerts",
	            templateUrl: "views/alerts.html"
	        })
	        .state('settings', {
	              url: "/settings",
	              templateUrl: "views/settings.html",
	              controller: function($scope){
	                $scope.items = ["A", "List", "Of", "Items"];
	              }
	        })
	    })
})();
(function(){
angular.module("directive.alerts.table",[])
  .controller("AlertController", ["$http", "$scope", "$log", function($http, $scope, $log){
  		$log.info("oi");

	 	$scope.isInitialized = 1;				
		$scope.alerts = [];
		
		$http.get("api/alerts").success(function(data){
			$scope.alerts = data;
		});

		$scope.alertTypes = [
   			{id: "sms", title: "SMS"},
   			{id: "email", title: "E-mail"}
		];

		$scope.isDataValid = function (){
			for(var i = 0; i < $scope.alerts.length; i++){		
				$log.info($scope.alerts[i].alertType);
				var type = $scope.alerts[i].alertType;
				if(!type || type==null || type.length === 0){
					return false;
				}    			
			}
			return true;
		};

		$scope.saveData = function(){
			$http.post("api/alerts", $scope.alerts)
				.success(function(data/*, status, headers, config*/) {
					$log.info( "saved: " + data);
				}).error(function(data/*, status, headers, config*/) {
					$log.info( "failure message: " + JSON.stringify({data: data}));
			});			
		};
	}])	
	.directive("alertsTable", function() {
		return {
			restrict: "E",
			templateUrl: "../templates/directive-alerts-table.html",
			scope: false,
			controller: "AlertController"
		};
	});
})();