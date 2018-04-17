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
testRouter.use("/500", function(req, res) {
	res.render("500", { title:'500: Internal Server Error' });
});
testRouter.use("/404", function(req, res) {
	res.render("404", { title:'404: File Not Found' });
});

module.exports = function(app, passport) {
	app.use("/test", testRouter);
}
