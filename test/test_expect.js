/*expect link: https://github.com/Automattic/expect.js?files=1*/
var expect = require("expect.js");
describe("Test expect.js", function() {
	describe("ok: asserts that the value is truthy or not", function() {
		it("should 1 to be ok()", function() {
			expect(1).to.be.ok();
		});
		it("should true to be ok()", function() {
			expect(true).to.be.ok();
		});
		it("should {} to be ok()", function() {
			expect({}).to.be.ok();
		});
		it("should 0 not to be ok()", function() {
			expect(0).to.not.be.ok();
		});
	});
	describe("be/equal: asserts === equality", function() {
		it("should 1 to be 1", function() {
			expect(1).to.be(1);
		});
		it("should NaN not to equal NaN", function() {
			expect(NaN).not.to.equal(NaN);
		});
		it("should 1 not to be true", function() {
			expect(1).not.to.be(true);
		});
		it("should '1' not to be 1", function() {
			expect('1').not.to.be(1);
		});
		it("should {a: 'b'} not to equal {a: 'b'}", function() {
			expect({a: 'b' }).not.to.equal({a: 'b'});
		});
		it("should anObject to be anObject", function() {
			var anObject = {a: 'b'};
			expect(anObject).to.be(anObject);
		});
		it("should anObject to equal anObject", function() {
			var anObject = {a: 'b'};
			expect(anObject).to.equal(anObject);
		});
		it("should string Hello to equal Hello", function() {
			expect("Hello").to.equal("Hello");
		});
	});
	it("eql: asserts loose equality that works with objects", function(done) {
		expect({a: 'b'}).to.be.eql({a: 'b'});	
		expect(1).to.eql('1');
		done();
	}); 
	it("a/an: asserts typeof with support for array type and instanceof", function(done) {
		//type with optional `array`	
		expect(5).to.be.a('number');
		expect([]).to.be.an('array');
		expect([]).to.be.an('object');
		//constructors
		expect([]).to.be.an(Array);
		done();
	});
	it("match: asserts String regular expression match", function(done) {
		var program = {
			version: '1.0.1'
		};	
		expect(program.version).to.match(/[0-9]+\.[0-9]+\.[0-9]+/);
		done();
	});
	it("contain: asserts indexOf for an array or string", function(done) {
		expect([1,2]).to.contain(1);	
		expect("Hello World").to.contain("World");
		done();
	});
	it("length: asserts array .length", function(done) {
		expect([]).to.have.length(0);	
		expect([1,2,3]).to.have.length(3);	
		done();
	});
	it("empty: asserts that an array is empty or not", function(done) {
		expect([]).to.be.empty();
		expect({}).to.be.empty();
		expect({ length: 0, duck: 'typing' }).to.be.empty();
		expect({ my: 'object' }).to.not.be.empty();
		expect([1,2,3]).to.not.be.empty();
		done();
	});
	it("property: asserts presence of an own property (and value optionally)", function(done) {
		expect({a: 'b'}).to.have.property('a');	
		done();
	});
	it("key/keys: asserts the presence of a key. Support the only modifier", function(done) {
		expect({a: 'b'}).to.have.key('a');	
		expect({ a: 'b', c: 'd'}).to.only.have.keys('a','c');
		expect({ a: 'b', c: 'd'}).to.only.have.keys(['a','c']);
		done();
	});
	it("throw/throwException/throwError: asserts that the Function throws or not when called", function(done) {
		done();
	});
});
