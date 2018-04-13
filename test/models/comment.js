var mongoose = require("mongoose");
var assert = require("assert");
var Comment = require("../../models/Comment");
var Post = require("../../models/Post");
var Quote = require("../../models/Quote");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");

describe("Test Comment model", function(){

	//test case
	it("Perepare for test", function(done){
		Comment.remove({}, function(err){
			if(err) return done(err);		
		});
		done();
	});
	
	after(function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection closed');
		});
	});

	describe("Test Add Comment", function(){

		it("Add a Comment", function(done){
			let comment = new Comment({
				content: "This is my first comment",	
				created_by: "59e40410eeb6c4775bf67ca3",
				type: "Quote",
				id_of_type: "59e4a26070df094f7f992617"
			});
			comment.save(function(err, resultComment){
				if(err) return done(err);
				assert.equal(resultComment.content, "This is my first comment");
				done();
			});
		});

		it("Population a quote of comment", function(done){
			Comment.findOne({content: "This is my first comment"})
				.populate('id_of_type')
				.exec(function(err, quote){
					if(err) return done(err);
					console.log(quote);
					done();
				});
		});

	});
});
