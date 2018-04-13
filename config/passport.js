// load up the user model
var User = require('../models/User');
// load the auth variables
var configAuth = require('./auth'); // use this one for testing

module.exports = function(passport) {

	// =========================================================================
	// passport session setup ==================================================
	// =========================================================================
	// required for persistent login sessions
	// passport needs ability to serialize and unserialize users out of session

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	//Use local strategy
	require("./passport_strategy_local")(passport);

	//Use facebook strategy
	require("./passport_strategy_facebook")(passport);

	//Use twitter strategy
	require("./passport_strategy_twitter")(passport);

	//Use google strategy
	require("./passport_strategy_google")(passport);

	//Use jwt strategy
	require("./passport_strategy_jwt")(passport);
};
