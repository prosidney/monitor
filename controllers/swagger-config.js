var alertsRest = require("./alerts.js");
var swagger = require("swagger-node-express");

exports.configure = function(app, url){
	swagger.configureSwaggerPaths("", "/api-docs", "");

	//Couple the application to the Swagger module. 
	swagger.setAppHandler(app);

	var alerts = alertsRest.getAllAlerts();
	var alert = alertsRest.getAlert(swagger);
	var saveAlerts = alertsRest.saveAlerts(swagger);

	swagger.addGet({'spec' : alerts.spec, 'action' : alerts.ctrl});
	swagger.addGet({'spec' : alert.spec, 'action' : alert.ctrl});
	swagger.addPost({'spec' : saveAlerts.spec, 'action' : saveAlerts.ctrl});

	swagger.configure(url, "0.1");
}