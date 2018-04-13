var mongoose = require("mongoose");
var assert = require("assert");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
mongoose.set('debug', true)
describe("Test create unique", function(){
	var schema = new mongoose.Schema({
		name: { type: String, unique: true }
	});
	var Model = mongoose.model('Test', schema);
	it("Save same name", function(done){
		Model.create([{ name: 'Val' }, { name: 'Val' }], function(err) {
			if(err) {
				//error duplicate because index was already built
				return done(err);
			}
			done();
		});

	});
});

