var express = require('express');
var router = express.Router();
var Category = require("../models/Category");
var Quote = require("../models/Quote");
/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Danh Ngôn' });
});
router.get('/quote/:cat/', function(req, res, nex){
	Quote.find({categories: req.params.cat}).select('content author saved_user liked_user tags')
		.exec(function(err, resultQuotes){
			if(err) return next(err);
			//console.log(resultQuotes);
			//console.log("--------");

			if(Object.keys(resultQuotes).length > 0){
				res.render('quote_by_cat',{quotes: resultQuotes});
			}
		});
});
router.get('/async/quote/:cat/:skip', function(req, res, nex){
	Quote.find({categories: req.params.cat}).limit(6).skip(req.params.skip).select('content author saved_user liked_user tags')
		.exec(function(err, resultQuotes){
			if(err) return next(err);
			//console.log(resultQuotes);
			//console.log("--------");

			if(Object.keys(resultQuotes).length > 0){
				res.render('quote_by_cat',{quotes: resultQuotes});
			}else{
				res.send("0");
			}
		});
});

router.get('/async/quote/:cat', function(req, res, nex){
	Quote.find({categories: req.params.cat}).limit(6).select('content author saved_user liked_user tags')
		.exec(function(err, resultQuotes){
			if(err) return next(err);
			//console.log(resultQuotes);
			//console.log("--------");

			if(Object.keys(resultQuotes).length > 0){
				res.render('quote_by_cat',{quotes: resultQuotes});
			}
		});

});
router.get('/login', function(req, res, next) {
	res.render('login', { title: 'Đăng Nhập' , message: req.flash('loginMessage') });
});

router.post('/login', function(req, res, next){
	res.send("email:"+req.body.email+" password:"+req.body.password);
});

module.exports = router;
