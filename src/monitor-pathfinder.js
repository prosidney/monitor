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