var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/danhngon");
var User = require("./models/User");
var jwt = require("jsonwebtoken");
var passport = require("passport");
var configAuth = require("./config/auth");
require("./config/passport_strategy_jwt")(passport);

var app = express();
app.use(passport.initialize());
// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({extended: true}));
// parse application/json
app.get("/", function(req, res) {
	res.json({message: "Express is up!"});
});

app.post("/jwt_login", function(req, res) {
	if(req.body.email && req.body.password){
		var email = req.body.email;
		var password = req.body.password;
		process.nextTick(function() {
			// usually this would be a database call:
			User.findOne({'local.email': email}, function(err, user){
				if(err) {
					res.status(503).json({message:"Internal Error"});
					return;
				}	
				if(!user) {
					res.status(401).json({message:"no such user found"});
					return;
				}
				if(user.validPassword(req.body.password, user.local.password)) {
					// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
					var payload = {id: user.id};
					var token = jwt.sign(payload,configAuth.jwtAuth.secretOrKey);
					res.json({message: "ok", token: token});
					return;
				} else {
					res.status(401).json({message:"passwords did not match"});
					return;
				}
				return;
			});
		});
	}
});

app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res){
	res.json({message: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
	function(req, res, next){
		console.log(req.get('Authorization'));
		next();
	}, function(req, res){
		res.json("debugging");
	});

app.listen(3000, function() {
	console.log("Express running");
});
