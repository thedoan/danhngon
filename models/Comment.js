var mongoose = require("mongoose");
var creationInfo = require("./plugin/creationinfo");
var Schema = mongoose.Schema;
var commentSchema = Schema({
	content: String,
	created_by:{ type: Schema.Types.ObjectId, ref: 'User' },
	type: { type:String, 
		enum:{ 
			values: ['Quote', 'Post'],
			message: 'enum validator failed for path `{PATH}` with value `{VALUE}`, use quote or post instead'	
		}},
	/* use dynamic reference*/
	id_of_type: { type: Schema.Types.ObjectId, refPath: 'type'	},
	/*
	created_on: { type: Date, default: Date.now },
	modified_on: { type: Date, default: Date.now }
	*/
});
commentSchema.plugin(creationInfo);
module.exports = mongoose.model("Comment", commentSchema);
