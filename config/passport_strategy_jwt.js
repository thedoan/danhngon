var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var User = require('../models/User');
var configAuth = require('./auth'); // use this one for testing
module.exports = function(passport) {
	// ========================================================================
	// JSONWEBTOKEN ===========================================================
	// ========================================================================
	var jwtOptions = {};
	jwtOptions.secretOrKey = configAuth.jwtAuth.secretOrKey;
	jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
	var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
		//console.log('payload received', jwt_payload);
		User.findOne({_id: jwt_payload.id}, function(err, user){
			if(err) {
				console.log("Error when find User");
				return next(err);
			}	
			if(!user) {
				console.log("No user match");
				return next(null, false);
			}
			//console.log("User:",user);
			return next(null, user);
		});

	});
	passport.use(strategy);
}
