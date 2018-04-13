var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/test");
var db = mongoose.connection;
db.on("error", console.error.bind(console, 'connection error:'));
db.on("open", function() {
	console.log("We're connected!");
});
/*
var kittySchema = mongoose.Schema({
	name: String
});
// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
	var greeting = this.name
		? "Meow name is " + this.name
		: "I don't have a name";
	console.log(greeting);
}

var Kitten = mongoose.model("Kitten", kittySchema);
var silence = new Kitten({ name: 'Silence' });
console.log(silence.name); // 'Silence's
silence.speak();
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak(); // "Meow name is fluffy"
fluffy.save(function (err, fluffy) {
	if (err) return console.error(err);
	fluffy.speak();
});
Kitten.find({ name: /^fluff/ },function (err, kittens) {
		if (err) return console.error(err);
		console.log(kittens);
});
*/
/*
var blogSchema = new Schema({
	title:  String,
	author: String,
	body:   String,
	comments: [{ body: String, date: Date }],
	date: { type: Date, default: Date.now },
	hidden: Boolean,
	meta: {
		votes: Number,
		favs:  Number
	}
});
var Blog = mongoose.model('Blog', blogSchema);
*/

// ready to go!
// define a schema
var animalSchema = new Schema({
	name: String, 
	type: String,
	tags: { type: [String], index: true } // field level
});
 //to disable create Index 
 animalSchema.set('autoIndex', false);
 animalSchema.index({ name: 1, type: -1 }); // schema level

// assign a function to the "methods" object of our animalSchema
animalSchema.methods.findSimilarTypes = function(cb) {
	return this.model('Animal').find({ type: this.type }, cb);
};
// assign a function to the "statics" object of our animalSchema
animalSchema.statics.findByName = function(name, cb) {
	return this.find({ name: new RegExp(name, 'i') }, cb);
};
animalSchema.query.byName = function(name) {
	return this.find({ name: new RegExp(name, 'i') });
};
var Animal = mongoose.model('Animal', animalSchema);
/* happen when index done building or when error*/
 Animal.on('index', function(error) {
	console.log("on Index");
	if(error)
    // "_id index cannot be sparse"
    console.log(error.message);
  });
var fido = new Animal({ name: 'fido',type: 'dog' });
var dog2 = new Animal({ name: 'key',type: 'dog' });
fido.save(function(err, dog) {
	if(err) console.error(err);
	console.log("Dog:", dog);
});
dog2.save(function(err, dog) {
	if(err) console.error(err);
	console.log("Dog2:", dog);
});
fido.findSimilarTypes(function(err, dogs) {
	console.log("Similar type:",dogs); // woof
});
Animal.findByName('fido', function(err, animals) {
	console.log("Find by Name:",animals);
});
Animal.find().byName('fido').exec(function(err, animals) {
	console.log("By Name:",animals);
});
