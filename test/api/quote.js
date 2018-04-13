var expect = require("expect.js");
var superagent = require("superagent");
var Quote = require("../../models/Quote");
var test_setting = require("../config/test_setting"); 
var url = "http://"+test_setting.host+":"+test_setting.port;
var token;
var quoteID;
var aQuote = {
	content: "Điều duy nhất cái ác không còn chỗ đứng là sự tha thứ.",
	author: "Fred Rogers",
	categories: ["Hạt Giống", "Tâm Hồn"],
	tags: ["Hat Giong", "Tam Hon"],
};

describe("Rest api Quote testing", function() {
	before(function(done) {
		superagent.post(url+"/api_login")
			.send({email: 'dangthedoan@gmail.com', password: 'abc@123'})
			.then(function(res) {
				//console.log(res.text);
				token = res.body.data;
				//console.log("token:",token);
				done();
			});
	});

	it("Should success create a quote", function(done) {
		superagent.post(url + "/api/quote")
			.send(aQuote)
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				//console.log(res.text);
				expect(res.body.data._id).to.be.ok();
				expect(res.body.data._id.length).to.above(5);
				quoteID = res.body.data._id;
				//console.log("quoteID:", quoteID);
				expect(res.body.status).to.equal("ok");
				done();
			});
	});
	it("Should exist quote", function(done) {
		superagent.post(url + "/api/quote")
			.send(aQuote)
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				expect(res.body.status).to.equal("exist");
				done();
			});
	});
	it("Should success update a quote", function(done) {
		aQuote.tags = ["Tam Hon"];
		//console.log("quoteID:",quoteID);
		superagent.put(url + "/api/quote/by/id/"+quoteID)
			.send(aQuote)
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				//console.log("update response:",res.text);
				expect(res.body.status).to.equal("ok");
				expect(res.body.data.tags[0]).to.equal("Tam Hon");
				done();
			});
	});

	it("Should success delete a quote by id", function(done) {
		superagent.del(url+ "/api/quote/by/id/"+ quoteID)
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				//console.log("Delete by id:",res.text);	
				expect(res.body.status).to.equal("ok");
				expect(res.body.data._id).to.equal(quoteID);
				done();
			});	
	});

	it("Should success delete a quote by content", function(done) {
		superagent.post(url + "/api/quote")
			.send(aQuote)
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				//console.log(res.text);
				expect(res.body.data._id).to.be.ok();
				expect(res.body.data._id.length).to.above(5);
				quoteID = res.body.data._id;
				//console.log("quoteID:", quoteID);
				expect(res.body.status).to.equal("ok");
			});
		superagent.del(url+"/api/quote/by/content/"+encodeURI(aQuote.content))	
			.set("Authorization", "jwt "+token)
			.then(function(res) {
				expect(res.body.status).to.equal("ok");
				expect(res.body.data.content).to.equal(aQuote.content);
				console.log(res.text);
			});
		done();
	});
	it("Should success get a list quote", function(done) {
		superagent.get(url + "/api/quote")
		.set("Authorization", "jwt " + token)	
		.then(function(res) {
			expect(res.body.status).to.equal("ok");
			expect(res.body.data.length).to.above(0);
		});
		done();
	});
});
