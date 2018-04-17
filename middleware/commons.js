var Category = require("../models/Category");
module.exports = function(req, res, next){
	if(req.user) {
		res.locals.user = req.user;	
	}else{
		res.locals.user = {};
	}
	Category.find({}).select('name tag -_id').exec(function(err, cats){
		if(err) {
			return next(err);
		}else{
			res.locals.cats = cats;
			console.log("Danh ngon commons");
			next();		
		}

	});	

}
