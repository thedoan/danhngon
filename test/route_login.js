var request = require("supertest");
var app = require("../app");
var cheerio = require("cheerio");
var assert = require("assert");

describe("GET /login ", function(){

	it("respond with html and have label Email", function(done){
		//Test route
		request(app)
			.get("/login")
			.expect("Content-type", "text/html; charset=utf-8")
			.expect(200)
			.end(function(err, res){
				var html = res.text;
				var $ = cheerio.load(html);
				assert.equal($('label[for=email]>strong','form[name=formUserLogin]').text(),"Email:");
				if(err) return done(err);
				done();
			});
	});

});

describe("POST /login", function(){

	it("should have email and password", function(done){
		request(app)
			.post("/login")
			.type("form")
			.field("email","dangthedoan@gmail.com")
			.field("password","abc@123")
			.then((result) => {
				console.log(result);
			})
			.catch((err) => {
				done(err);
			});
			/*
			.end(function(err, res){
				console.log(res.text);
				if(res.text.indexOf("dangthedoan@gmail.com") > -1){
				assert.ok();
				}else{
					assert.fail();
				}
			});
			*/
	});

});

