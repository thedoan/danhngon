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
describe("Web Quote testing", function() {
	it.skip("Should save favorite quote success", function(done) {
		let quoteid = "";
		let userid = "";
		superagent.get(url+"/async/quote/quoteid/");
	});
});
