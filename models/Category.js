var mongoose = require("mongoose");
var creationInfo = require("./plugin/creationinfo");
var Schema = mongoose.Schema;
var categorySchema = Schema({
	name: { type: String, unique: true },
	tag: { type: String, unique: true },
	order: { type: Number, default: 0 }
});
categorySchema.plugin(creationInfo);
module.exports = mongoose.model("Category", categorySchema);
