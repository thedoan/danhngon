var mongoose = require("mongoose");
var assert = require("assert");
var khongdau = require("khong-dau");

describe("Test không dấu", function(){
	//test case
	it("Should Tâm hồn equal Tam-hon", function(done){
		let resultKhongDau = khongdau("Tâm hồn", ["chuyen","url"]);		
		assert.equal(resultKhongDau, "Tam-hon");
		done();
	});
});
