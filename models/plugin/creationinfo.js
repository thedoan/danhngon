var creationInfo = function creationInfo(schema, options){
	schema.add({created_on: {type: Date, default: Date.now}});
	schema.add({modified_on: {type: Date, default: Date.now}});
	schema.pre('save', function(next){
		this.modified_on = Date.now();
		next();
	});
};
module.exports = creationInfo;
