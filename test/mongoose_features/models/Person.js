var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var personSchema = Schema({
	name: { type: String, unique: true }	
});
personSchema.init();
module.exports = mongoose.model("Person", personSchema);
