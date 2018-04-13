var request = require("supertest");
var app = require("../app");
var cheerio = require("cheerio");
var assert = require("assert");

describe("Test GET / ", function(){
	it("respond with html", function(done){
		//Test route
		request(app)
			.get("/")
			.expect("Content-type", "text/html; charset=utf-8")
			.expect(200)
			.end(function(err, res){
				$ = cheerio.load(res.text);
				//console.log($('.card-title').text());
				assert.equal($('.card-title').text(),"Card title");
				//console.log(res.text);
				if(err) return done(err);
				done();
			});

	});
});

