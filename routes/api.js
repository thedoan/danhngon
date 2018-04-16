var express = require("express");
var apiRouter = express.Router();
var Quote = require("../models/Quote");
var User = require("../models/User");
var jwt = require('jsonwebtoken');
var configAuth = require("../config/auth");
var quoteController = require("../controllers/quote");

var oInternalError = {
	status: "error",
	data: "Internal Server Error"
};
var oNotExist = {
	status: "notExist",
	data: "Quote not Exist"
};
module.exports = function(app, passport) {
	apiRouter.all('*', passport.authenticate("jwt", {session: false}));	
	/*get list of quote*/
	apiRouter.get("/", function(req, res, next) {
		res.json("api route");	
	});
	/*get list quote by search*/
	apiRouter
	/*Add a new quote*/
	apiRouter.post("/quote", function(req, res, next) {
		// Check if this quote content exist
		if(req.body.content){
			Quote.findOne({content: { '$regex' : req.body.content, '$options': 'i' }}, function(err, quote) {
				if(err) {
					res.json(oInternalError);
					return;
				}	
				//not exist quote so create them
				if(!quote){
					const newQuote = new Quote(req.body);
					newQuote.save(function(err, quote) {
						if(err) {
							res.json(oInternalError);
							return;
						}
						res.json({
							status: "ok",
							data: quote
						});
					});			
				}else{
					//respone that quote exist
					res.json({
						status: "exist",
						data: quote
					});
					return;
				}
			});
		}
	});
	/* Delete quote by id */
	apiRouter.delete("/quote/by/id/:id", function(req, res) {
		Quote.findOneAndRemove({_id: req.params.id}, function(err, removedQuote) {
			if(err) {
				res.json(oInternalError);
				return;
			}	
			res.json({
				status: "ok",
				data: removedQuote
			});
		});
	});
	/* Delete by quote content */
	/* Do dai noi dung bao nhieu thi delete 
	 * Neu day la doan giua cua noi dung thi sao
	*/
	apiRouter.delete("/quote/by/content/:content", function(req, res) {
		Quote.findOneAndRemove({content: req.params.content, created_by: req.user.id}, function(err, removedQuote) {
			if(err) {
				res.json(oInternalError);
				return;
			}	
			res.json({
				status: "ok",
				data: removedQuote
			});
		});
	});
	/*Update a quote by content*/
	apiRouter.put("/quote/by/content/:content", function(req, res, next) {
		//	
	});
	/*Update a quote by id */
	apiRouter.put("/quote/by/id/:id", function(req, res, next) {
		//console.log("update by id: body:",req.body)
		Quote.findOneAndUpdate({_id: req.params.id}, {$set: req.body },{new: true}, function(err, updatedQuote) {
			if(err) {
				res.json(oInternalError);
				return;
			}
			res.json({
				status: "ok",
				data: updatedQuote
			});
		});
	});
	/*get all quote*/
	apiRouter.get("/quote", function(req, res, next) {
		var defaulLimit = 15;
		Quote.find({}).limit(defaulLimit).exec(function(err, resultQuotes) {
			if(err) {
				res.json(oInternalError);	
				return;
			}
			res.json({
				status: "ok",
				data:	resultQuotes
			});	
		});
	});
	//get quote by id
	apiRouter.get("/quote/id/:id", function(req, res, next) {
		res.json("api quote:id route");
	});
	//get quote by content
	apiRouter.get("/quote/content/:content", function(req, res, next) {
		res.json("api quote:id route");
	});
	//get quote by content with limit
	apiRouter.get("/quote/content/:content/limit/:limit", quoteController.doApiSearchLimit);

	//get quote by author
	apiRouter.get("/quote/author/:author", function(req, res, next) {
		res.json("api quote:id route");
	});
	//get quote by author and content
	apiRouter.get("/quote/author/:author/content/:content", function(req, res, next) {
		res.json("api quote:id route");
	});
	//get quote by categories
	apiRouter.get("/quote/category/:category", function(req, res, next) {
		process.nextTick(function() {
			Quote.find({categories: {'$regex': req.params.category, '$options': 'i'}}).select('content author saved_user liked_user tags')
				.exec(function(err, resultQuotes){
					if(err) {
						res.json({
							status: "error",
							data: err.message
						});
						return;
					}

					if(Object.keys(resultQuotes).length > 0){
						res.json({
							status: "ok",
							data: resultQuotes
						});
						return;
					}else{
						res.json({
							status: "error",
							data: "No record match"
						});
						return;
					}
				});
		});
	});
	/*create a quote*/
	apiRouter.post("/quote/cat/", function(req, res, next) {
		res.json("Post a quote");
	});
	apiRouter.put("/quote/cat/", function(req, res, next) {
		res.json("Put a quote");	
	});
	/* get list by post */
	apiRouter.get("/post", function(req, res, next) {
		res.json("api post route");	
	});

	//app.use("/api",passport.authenticate("jwt", {session: false}), apiRouter);
	app.use("/api", passport.authenticate("jwt", {session: false}), apiRouter);
}
