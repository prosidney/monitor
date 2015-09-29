describe("AlertController", function() {
	beforeEach(module("directive.alerts.table"));

	var scope, ctrl, http, httpBackend;

	beforeEach(inject(function($rootScope, $http, $httpBackend, $controller){
		scope = $rootScope.$new();
		http = $http;
      	httpBackend = $httpBackend;
      	httpBackend.when("api/alerts").respond(200, 'fsdf');
      	ctrl = $controller('AlertController', {$scope: scope, $http: http});      	
	}));

	describe("test", function() {
		it("hi", function() {
			expect(scope.isInitialized).toEqual(1);
			expect(scope.alerts).toEqual([]);			
		});
	});

	describe("test isDataValid method", function() {
		beforeEach(function(){
			scope.alerts = [
							{
							    "id": "130d6645ec4efc68ebd17bb851ee9576",
							    "name": "alert xyz",
							    "message": "message alert xyz",
							    "date": "2015-08-13T15:16:38.132Z",
							    "alertType": "sms"
							  },
							  {
							    "id": "130d6645ec4efc68ebd17bb851f1e072",
							    "name": "alert zpto",
							    "message": "message alert zpto",
							    "date": "2015-08-13T15:16:38.132Z",
							    "alertType": "email"
							  }
							];
		});

		it("test all valid records", function() {
			expect(scope.isDataValid()).toEqual(true);		
		});

		it("test 1 invalid record", function() {
			scope.alerts[0].alertType = "";

			expect(scope.isDataValid()).toEqual(false);		
		});		
	});
});