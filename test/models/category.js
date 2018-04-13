var mongoose = require("mongoose");
var assert = require("assert");
var Category = require("../../models/Category");
var Comment = require("../../models/Comment");
var Post = require("../../models/Post");
var Quote = require("../../models/Quote");
var khongdau = require("khong-dau");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/danhngon");

describe("Test Category model", function(){

	//test case
	it("Perepare for test", function(done){
		//reset Category data
		Category.remove({}, function(err){
			if(err) return done(err);		
		});
		done();
	});

	after(function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection closed');
		});
	});

	describe("Test Add Category", function(){
		it("Add a Category", function(done){
			let sName = "Hạt giống tâm hồn";	
			let sTag = khongdau(sName, ["chuyen","url"]);
			let category= new Category({
				name: sName,	
				tag: sTag
			});
			category.save(function(err, resultCategory){
				if(err) return done(err);
				assert.equal(resultCategory.name, "Hạt giống tâm hồn");
				assert.equal(resultCategory.tag, "Hat-giong-tam-hon");
				done();
			});
		});

		it("Duplicate category", function(done){
			let sName = "Hạt giống tâm hồn";	
			let sTag = khongdau(sName, ["chuyen","url"]);
			let category= new Category({
				name: sName,	
				tag: sTag
			});
			category.save(function(err, resultCategory){
				if(err) {
					assert.ok(true);	
					//return done(err);
					done();	
				}else{
					assert.fail();
					done();
				}
			});
		});

		it("Add list category", function(done){
			let inc = 0;

			let arrCategorys = [
			{ name: "Tình yêu", tag: khongdau("Tình yêu",["chuyen","url"]), order: ++inc },
			{ name: "Cuộc sống", tag: khongdau("Cuộc sống",["chuyen","url"]), order: ++inc },
			{ name: "Công việc", tag: khongdau( "Công việc",["chuyen","url"]), order: ++inc },
			{ name: "Tâm hồn", tag: khongdau( "Tâm hồn",["chuyen","url"]), order: ++inc },
			{ name: "Động lực", tag: khongdau( "Động lực",["chuyen","url"]), order: ++inc },
			{ name: "Học tập", tag: khongdau( "Học tập",["chuyen","url"]), order: ++inc },
			{ name: "Tu dưỡng", tag: khongdau( "Tu dưỡng",["chuyen","url"]), order: ++inc },
			{ name: "Giáo dục", tag: khongdau( "Giáo dục",["chuyen","url"]), order: ++inc },
			{ name: "Hạnh phúc", tag: khongdau( "Hạnh phúc",["chuyen","url"]), order: ++inc },
			{ name: "Trí tuệ", tag: khongdau( "Trí tuệ",["chuyen","url"]), order: ++inc }
			];

			Category.insertMany(arrCategorys, function(err, cats){
				if(err) return done(err);	
				assert.equal(Object.keys(cats).length, 10);
				done();
			});
		});

	});
});
