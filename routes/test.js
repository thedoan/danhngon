var express = require('express');
var templateRouter = require('./templates');
var bootstrap4Router = require('./bootstrap4');
var proRouter = require('./pro');
var testRouter = express.Router();
var requestInfo = require('../lib/request_info');

testRouter.use("/templates", templateRouter);
testRouter.use("/bootstrap4", bootstrap4Router);
testRouter.use("/pro", proRouter);
testRouter.get('/onepixel', function(req, res, next){
	//get request info
	//return image
	requestInfo(req, res, next);	
});

module.exports = function(app, passport) {
	app.use("/test", testRouter);
}
