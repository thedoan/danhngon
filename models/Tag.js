var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var tagSchema = Schema({
	_id: {type: String, unique: true},
	count: {type: Number, default: 0},
	create_on: {type: Date, default: Date.now}
});
module.exports = mongoose.model("Tag", tagSchema);
