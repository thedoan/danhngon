// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

function toLower(v) {
	  return v.toLowerCase();
}
// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
				name		     : String,
        email        : { type: String, lowercase: true, unique: true },
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
		jwt              : {
				token        : String
		},
	authType: String
	
});

// generating a hash
userSchema.static("generateHash", function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
});

// checking if password is valid
userSchema.static("validPassword", function(password,encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
});
userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};
// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
