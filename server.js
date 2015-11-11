var express = require('express');
var app = express();
var mongojs = require('mongojs');
var port = process.env.PORT || 3000
var bodyParser = require('body-parser');
// CURRENT PROBLEM - AUTH FAILING. 
//var db = mongojs("mongodb://michaelzadra:Letmein1@ec2-52-23-251-196.compute-1.amazonaws.com:27017/admin?auto_reconnect=true&authSource=admin", ["meanCars"]);
var db = mongojs("localhost/meanCars", ["meanCars"]);





app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

db.meanCars.find({"year":1995}, function(err,docs){
	console.log(err);
	console.log(docs);
});

// Returns a JSON object containing all the cars of the specified year
app.post('/cars', function(req, res) {
	// Convert posted year to integer
	var year = parseInt(req.body.year, 10);
	// Get JSON object with cars from specified years
	db.meanCars.find({"year":year}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});

// Returns JSON object containing information for the car chosen by the user
app.post('/selectCar', function(req,res){
	console.log("I've recieved a request to fetch car information");

	var year = parseInt(req.body.year, 10);
	var make = req.body.make;
	var model = req.body.model;
	var vehicleClass = req.body.vehicle_class;
	console.log(year + ' ' + make + ' ' + model + ' ' + vehicleClass);

	db.meanCars.find({"year":year, "make":make, "model":model, "vehicle_class":vehicleClass}, function(err, docs){
		console.log(docs);
		res.json(docs);
	});
});


// Use port 3000
app.listen(port);
console.log("Sever running on port " + port);
