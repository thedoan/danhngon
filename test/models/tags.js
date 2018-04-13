var mongoose = require("mongoose"),
	Tag = require("../../models/Tag"),
	faker = require("faker"),
	assert = require("assert"),
	async = require("async");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
describe("Test Tag model", function(){
	before(function(){

	});
	beforeEach(function(){

	});	
	afterEach(function(){

	});
	after(function(){
		mongoose.connection.close(function(){
			console.log("Mongoose default connection closed");
		});
	});
	//test case
	it("Perepare for test", function(done){
		Tag.remove({}, function(err){
			if(err) return done(err);		
		});
		done();
	});
	describe("Test add a Tag", function(){
		it("add a tag", function(done){
			let tag = new Tag({
				_id: "tình yêu"
			});	

			tag.save(function(err, tag){
				if(err) return done(err);
				assert.equal(tag._id,"tình yêu");
				done();
			});
		});
		it("unique a tag", function(done){
			let tag = new Tag({
				_id: "tình yêu"
			});	

			tag.save(function(err, tag){
				if(err) {
					//console.log(err);
					//err code 11000 mean dupplicate key
					assert.equal(err.code,11000);
				}else{
					assert.fail();
				}
				done();
			});
		});
		it("add a list of tag", function(done){
			let listTag = [
			{ _id: "cuộc sống" },
			{ _id: "xử thế" },
			{ _id: "hòa bình" },
			{ _id: "học tập" },
			{ _id: "con người" },
			{ _id: "khám phá" },
			{ _id: "trí tuệ" },
			{ _id: "phật giáo" }
			];
			Tag.insertMany(listTag, function(err, tags){
				if(err) return done(err);
				assert.equal(Object.keys(tags).length, listTag.length);
				done();
			});
		});
	});
});
