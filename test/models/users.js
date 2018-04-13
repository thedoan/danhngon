var mongoose = require("mongoose"),
	User = require("../../models/User"),
	assert = require("assert"),
	faker = require("faker"),
	async = require("async");

describe("Test User model", function(){

	before(function(){
		mongoose.Promise = global.Promise;
		mongoose.connect("mongodb://localhost/danhngon");
	});

	beforeEach(function(){

	});

	afterEach(function(){

	});

	after(function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection closed');
		});
	});
	it("Test user.id", function(done){
		User.findOne({'local.email':"dangthedoan@gmail.com"}, function(err, user) {
			if(err) return done(err);	
			console.log("user._id:",user._id);
			console.log("user.id:",user.id);
			assert.equal(user._id, user.id);
			done();	
		});
	});
	/*
	//test case
	it("Perepare for test", function(done){
		User.remove({}, function(err){
			if(err) return done(err);		
		});
		done();
	});

	describe("Test Add User", function(){
		
		it("Add a User", function(done){
			let user = new User({
				_id: "59e40410eeb6c4775bf67ca3",
				local: {
					name: "Thế Đoàn",
					email: "dangthedoan@gmail.com",
					password: User.generateHash("abc@123")
				}	
			});
			//console.log(user.local.password);
			//user.markModified('local');
			user.save(function(err, user){
				if(err) return done(err);
				assert.equal(user.local.email, "dangthedoan@gmail.com");
				//console.log(user.local.password);
				assert.ok(User.validPassword("abc@123",user.local.password));
				assert.ok(user.validPassword("abc@123"));
				done();
			});
		});

		it("Add list User", function(done){
			let arrID = [
				"59e3f4840851315623db44c4",
				"59e3f5248154d659da8ec947",
				"59e3f5a80876045ab860e5a3",
				"59e3f6c6f44c155c6c10fbf4",
				"59e3f6e79071415d20570883",
				"59e3f706fc0d885d81b10f3b"	
			];		
			let arrUser = [];
			for(let i = 0; i < arrID.length; i++){
				arrUser.push({
					_id: arrID[i],
					local:{
						name: faker.name.findName(),
						email: "user"+i+"@gmail.com",
						password: User.generateHash("abc@123")
					}
				});
			}
			User.insertMany(arrUser, function(err, users){
				if(err) return done(err);
				assert.equal(Object.keys(users).length, 6);
				done();
			});
		});

	});
	*/
});
