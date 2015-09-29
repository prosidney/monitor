/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express')
var url = require("url")
var swaggerConfig = require("./controllers/swagger-config.js");
var bodyParser = require('body-parser');

// create a new express server
var app = express()

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/client'));

var router = express.Router(); // get an instance of the express Router

app.use('/api', router);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var appUrl = "http://localhost";
var appPort = 3000;
swaggerConfig.configure(app, appUrl+":"+appPort);

// start server on the specified port and binding host
app.listen(appPort, function() {

  // print a message when the server starts listening
  console.log("server starting on " + appUrl+":"+appPort);
});
