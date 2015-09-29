//var Cloudant = require('Cloudant');
var cloudant = require('cloudant')("https://sidsilva:<NOT_DEFINED>@sidsilva.cloudant.com");

// specify the database we are going to use
var test = cloudant.db.use('monitor-pathfinder')

exports.getAllAlerts = function(){
	var ctrl = function(req, res) {
/*		test.view('alert', 'all_alerts', function(err, body) {
			var alerts = [];
			if (!err) {
				for (var i = 0; i < body.total_rows; i++) {
					var row = body.rows[i];
					alerts.push({id: row.id,
						         _rev: row.value._rev,
								 name: row.value.name,
								 message: row.value.message,
								 type: row.value.type,
								 date: row.key,
								 alertType: row.value.alertType});
				}
			}
		});*/
		res.json([
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
		]);
	};
	var spec = {
		    "description" : "List all alerts",
		    "path" : "/api/alerts",
		    "notes" : "Returns a list of alerts",
		    "summary" : "List all alerts",
		    "method": "GET",
		    "nickname" : "alerts"
	};
	return {
        ctrl: ctrl, 
        spec: spec
    };	
}

exports.getAlert = function(swagger){
	var ctrl = function(req, res) {
		var alert = {
				 "id":"1",
				 "name":"alert xyz",
				 "type":"alert",
				 "alertType":"sms"
				};
	
		alert.id = req.params.alert_id;
	
		res.json(alert);   
	};
	var spec = {
		    "description" : "Find an alert by id",
		    "path" : "/api/alert/{alert_id}",
		    "notes" : "Returns an alert by id",
		    "summary" : "Find alert",
		    "parameters" : [swagger.pathParam("alert_id", "ID of the alert", "string")],
		    "method": "GET",
		    "nickname" : "alert"
	};
	return {
        ctrl: ctrl, 
        spec: spec
    };
} 

exports.saveAlerts = function(swagger){
	var ctrl = function(req, res) {	
		var alerts = req.body;

		for (var i = 0; i < alerts.length; i++) {
			var alert = alerts[i];

			console.log('saving _rev:' + alert._rev);
			test.insert(alert, alert.id, function(err, body, header) {
		    	if (err)
		    		return console.log('[alert.insert] ', err.message)
		    	return console.log('saved rev[', body.rev, ']')
		    });

		}

		res.json(req.body);		
	};	
	var spec = {
		    "description" : "save alerts",
		    "path" : "/api/alerts",
		    "notes" : "save a list of alerts",
		    "summary" : "save all alerts",
		    "parameters" : [swagger.bodyParam("alerts", "alerts", "string")],
		    "method": "POST",
		    "nickname" : "alerts"
	};
	return {
        ctrl: ctrl, 
        spec: spec
    };	
}
