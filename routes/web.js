var express = require('express');
var webRouter = express.Router();
var Category = require("../models/Category");
var Quote = require("../models/Quote");
var User = require("../models/User");
var isLoggedIn = require("../middleware/loggedIn");
var userRouter = require('./user');
var userControl = require('../controllers/user');
var quoteController = require('../controllers/quote');
var jwt = require('jsonwebtoken');
var configAuth = require("../config/auth");
var oInternalError = {
	status: "error",
	data: "Internal Server Error"
};
module.exports = function(app, passport) {
	//=======================================================
	// Public Route
	// ======================================================

	//home page
	webRouter.get('/', function(req, res, next) {
		//console.log(req.user.local.email);
		res.render('index', { title: 'Danh Ngôn', user: req.user });
	});
	//Search 
	webRouter.get('/search/:content', quoteController.doSearch);
	webRouter.post("/api_login", function(req, res, next) {
		User.findOne({'local.email': req.body.email}, function(err, user){
			if(err) {
				res.status(503).json(oInternalError);
				return;
			}	
			if(!user) {
				res.status(401).json({
					status: "error",
					data:"no such user found"});
				return;
			}
			if(user.validPassword(req.body.password, user.local.password)) {
				// from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
				var payload = {id: user.id};
				var token = jwt.sign(payload,configAuth.jwtAuth.secretOrKey);
				res.json({status: "ok", data: token});
				return;
			} else {
				res.status(401).json({status: "error",data:"passwords did not match"});
				return;
			}
		});
	});
	// Login Form
	webRouter.get('/login',function(req, res){
		/*
		if(req.isAuthenticated()){
			res.redirect('/');
		}else{
			res.render('../views/login', { message: req.flash('loginMessage'), user: req.user });
		}
		*/
		res.render('../views/login', { message: req.flash('loginMessage'), user: req.user });
	});
	// Post Local Login
	webRouter.post('/login', passport.authenticate('local-login', {
		successRedirect : '/', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	// Quote by categories page
	webRouter.get('/category/:category', function(req, res, next) {
		Quote.find({categories: {'$regex': req.params.category, '$options': 'i'}}, function(err, quotes) {
			if(err){
				next(err);
			}else {
				res.render('category', {category: req.params.category,quotes: quotes});
			}
		});				
	});
	// Get quote by categories
	webRouter.get('/quote/:cat/', function(req, res, nex){
		Quote.find({categories: {'$regex': req.params.cat, '$options': 'i'}}).select('content author saved_user liked_user tags')
			.exec(function(err, resultQuotes){
				if(err) return next(err);
				//console.log(resultQuotes);
				//console.log("--------");

				if(Object.keys(resultQuotes).length > 0){
					res.render('quote_by_cat',{quotes: resultQuotes, user: req.user});
				}
			});
	});
	// Ajax get quote by category and number start from
	webRouter.get('/async/quote/:cat/:skip', function(req, res, nex){
		Quote.find({categories: {'$regex': req.params.cat, '$options': 'i'}}).limit(6).skip(req.params.skip).select('content author saved_user liked_user tags')
			.exec(function(err, resultQuotes){
				if(err) return next(err);
				//console.log(resultQuotes);
				//console.log("--------");
				if(Object.keys(resultQuotes).length > 0){
					res.render('quote_by_cat',{quotes: resultQuotes, user: req.user});
				}else{
					res.send("0");
				}
			});
	});
	// Ajax get quote by category
	webRouter.get('/async/quote/:cat', function(req, res, nex){
		Quote.find({categories: {'$regex': req.params.cat, '$options': 'i'}}).limit(6).select('content author saved_user liked_user tags')
			.exec(function(err, resultQuotes){
				if(err) return next(err);
				//console.log(resultQuotes);
				//console.log("--------");

				if(Object.keys(resultQuotes).length > 0){
					res.render('quote_by_cat',{quotes: resultQuotes, user: req.user});
				}
			});

	});
// Ajax add saved user to quote
	webRouter.get("/async/quote/saveuser/quoteid/:quoteid/userid/:userid", function(req, res, next) {
		Quote.findById(req.params.quoteid, function(err, quote) {
			if(err) {
				res.json(oInternalError);
				return;
			}else{
				let index = quote.saved_user.indexOf(req.params.userid);
				if(index !== -1) {//already saved
					res.json({
						status: "error",
						data: "Already saved"
					});
					return;
				}else{
					quote.saved_user.push(req.params.userid);
					var numSavedUser = quote.saved_user.length;
					quote.save(function(err) {
						if(err) {
							res.json(oInternalError);
							return;
						}else {
							res.json({
								status: "ok",
								data: {
									message: "Success saved favourite quote",
									number: numSavedUser 
								}
							});
							return;
						}
					});
				}
			}
		});
	});
	// Ajax remove saved user to quote
	webRouter.get("/async/quote/removeuser/quoteid/:quoteid/userid/:userid", function(req, res, next) {
		Quote.findById(req.params.quoteid, function(err, quote) {
			if(err) {
				res.json(oInternalError);
				return;
			}else{
				//handler length of userid
				let index = quote.saved_user.indexOf(req.params.userid);
				if(index !== -1) {
					//remove this id away from saved_user array
					quote.saved_user.splice(index, 1);
					var numSavedUser = quote.saved_user.length;
					quote.save(function(err) {
						if(err) {
							res.json(oInternalError);
							return;
						}else {
							res.json({
								status: "ok",
								data: {
									message: "Success saved favourite quote",
									number: numSavedUser
								}
							});
							return;
						}
					});
				}else{//response not match
					res.json({
						status: "error",
						data: "No saved user to remove"
					});	
				}
			}
		});
	});


	// Ajax add liked user to quote
	webRouter.get("/async/quote/savelike/quoteid/:quoteid/userid/:userid", function(req, res, next) {
		Quote.findById(req.params.quoteid, function(err, quote) {
			if(err) {
				res.json(oInternalError);
				return;
			}else{
				let index = quote.liked_user.indexOf(req.params.userid);
				if(index !== -1) {//already liked
					res.json({
						status: "error",
						data: "Already liked"
					});
					return;
				}else{
					quote.liked_user.push(req.params.userid);
					var numLikedUser = quote.liked_user.length;
					quote.save(function(err) {
						if(err) {
							res.json(oInternalError);
							return;
						}else {
							res.json({
								status: "ok",
								data: {
									message: "Success save liked quote",
									number: numLikedUser
								}
							});
							return;
						}
					});
				}
			}
		});
	});
	// Ajax remove liked user to quote
	webRouter.get("/async/quote/removelike/quoteid/:quoteid/userid/:userid", function(req, res, next) {
		Quote.findById(req.params.quoteid, function(err, quote) {
			if(err) {
				res.json(oInternalError);
				return;
			}else{
				//handler length of userid
				let index = quote.liked_user.indexOf(req.params.userid);
				if(index !== -1) {
					quote.liked_user.splice(index, 1);
					var numLikedUser = quote.liked_user.length;
					quote.save(function(err) {
						if(err) {
							res.json(oInternalError);
							return;
						}else {
							res.json({
								status: "ok",
								data: {
									message: "Success remove liked quote",
									number: numLikedUser
								}
							});
							return;
						}
					});
				}else{//response not match
					res.json({
						status: "error",
						data: "No liked user to remove"
					});	
				}
			}
		});
		//Quote.findOneAndUpdate({_id: req.params.quoteid});	
	});

	// Signup page
	webRouter.get("/signup",function(req, res){
		res.render('../views/signup',{ message: req.flash('signupMessage'), user: req.user });
	});

	webRouter.post("/signup", passport.authenticate('local-signup', {
		successRedirect : '/user/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	webRouter.post("/api_signup", passport.authenticate('local-signup', {
		successRedirect : '/user/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	webRouter.get('/logout',function(req, res){
		req.logout();
		res.redirect('/');
	});

	// send to facebook to do the authentication
	webRouter.get('/auth/facebook', passport.authenticate('facebook'));

	// handle the callback after facebook has authenticated the user
	webRouter.get('/auth/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/user/profile',
			failureRedirect : '/login'
		}));

	webRouter.get('/auth/twitter', passport.authenticate('twitter'));
	webRouter.get('/auth/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/user/profile',
			failureRedirect : '/login'
		}));
	//==============================================================
	//######## End Public Route #########
	//==============================================================

	//===============================================================
	// Private Route
	// =============================================================

	//authenticated middleware
	// After this declare all route must authenticated to use
	webRouter.all('*',isLoggedIn);

	webRouter.use('/user', userRouter);

	// =============================================================================
	// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
	// =============================================================================

	// locally --------------------------------
	webRouter.get('/connect/local', function(req, res) {
		res.render('../views/signup', {user: req.user, message: req.flash('loginMessage') });
	});
	webRouter.post('/connect/local', passport.authenticate('local-signup', {
		successRedirect : '/user/profile', // redirect to the secure profile section
		failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	// facebook -------------------------------
	// send to facebook to do the authentication
	webRouter.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));
	// handle the callback after facebook has authorized the user
	webRouter.get('/connect/facebook/callback',
		passport.authorize('facebook', {
			successRedirect : '/user/profile',
			failureRedirect : '/'
		}));

	// twitter --------------------------------
	// send to twitter to do the authentication
	webRouter.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));
	// handle the callback after twitter has authorized the user
	webRouter.get('/connect/twitter/callback',
		passport.authorize('twitter', {
			successRedirect : '/user/profile',
			failureRedirect : '/'
		}));

	// google ---------------------------------
	// send to google to do the authentication
	webRouter.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));
	// the callback after google has authorized the user
	webRouter.get('/connect/google/callback',
		passport.authorize('google', {
			successRedirect : '/user/profile',
			failureRedirect : '/'
		}));

	// =============================================================================
	// UNLINK ACCOUNTS =============================================================
	// =============================================================================
	// used to unlink accounts. for social accounts, just remove the token
	// for local account, remove email and password
	// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	webRouter.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/user/profile');
		});
	});

	// facebook -------------------------------
	webRouter.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/user/profile');
		});
	});

	// twitter --------------------------------
	webRouter.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/user/profile');
		});
	});

	// google ---------------------------------
	webRouter.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/user/profile');
		});
	});

	//=================================================================
	//######### End Private Route #########
	//=================================================================

	// Asign webRouter to app route
	app.use("/",webRouter);
}

