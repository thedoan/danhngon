// load the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var creationInfo = require("./plugin/creationinfo");
var requestInfoSchema = Schema({
	ua: String,
	browser: Schema.Types.Mixed,
	cpu: Schema.Types.Mixed,
	device: Schema.Types.Mixed,
	engine: Schema.Types.Mixed,
	os: Schema.Types.Mixed,
	requestIP: String
});
// create the model for users and expose it to our app
requestInfoSchema.plugin(creationInfo);
module.exports = mongoose.model('RequestInfo', requestInfoSchema);
