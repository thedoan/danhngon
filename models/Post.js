var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var creationInfo = require("./plugin/creationinfo");

var postSchema = new Schema({
	title: String,
	author: String,
	body: String,
	url: String,
	tags: [String],
	likes: Number,
	hidden: { type:Boolean, default: false},
	comments: [{user: String, message: String, dateCreated: Date, like: Number}],
	/*
	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now },
	*/
});

postSchema.plugin(creationInfo);
//in production
postSchema.set({'autoIndex': false});
postSchema.index({title:1, body:1});
module.exports = mongoose.model("Post", postSchema);
