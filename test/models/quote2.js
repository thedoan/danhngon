var mongoose = require("mongoose"),
	faker = require("faker"),
	assert = require("assert"),
	async = require("async"),
	User = require("../../models/User"),
	Quote = require("../../models/Quote");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");

describe("Test Quote model", function(){

	//test case
	it("Perepare for test", function(done){
		Quote.remove({}, function(err){
			if(err) return done(err);		
		});
		done();
	});

	after(function(){
		mongoose.connection.close(function(){
			console.log('Mongoose default connection closed');
		});
	});

	describe("Test Add Quote", function(){

		it("Add a Quote", function(done){
			let quote = new Quote({
				_id: "59e4a26070df094f7f992617",
				content: "Điều duy nhất cái ác không còn chỗ đứng là sự tha thứ",
				author:"Fred Rogers",
				created_by: "59e40410eeb6c4775bf67ca3",
				categorys:["hạt giống tâm hồn","cách sống","giáo dục","hạnh phúc"],
				tags:["hat giong tam hon", "su that","cach song", "giao duc", "hanh phuc"],
				liked_user:[
					"59e3f5a80876045ab860e5a3",
					"59e3f6c6f44c155c6c10fbf4",
					"59e3f6e79071415d20570883",
					"59e3f706fc0d885d81b10f3b"	
				],
				saved_user:[
					"59e3f4840851315623db44c4",
					"59e3f5248154d659da8ec947",
					"59e3f5a80876045ab860e5a3"
				]
			});
			quote.save(function(err, quote){
				if(err) return done(err);
				assert.equal(quote.author, "Fred Rogers");
				assert.equal(quote.created_by, "59e40410eeb6c4775bf67ca3");
				assert.equal(quote.categorys.length,4);
				assert.equal(quote.tags.length,5);
				done();
			});
		});

		it("Add list Quote", function(done){
			let arrAuthIDs = [
				"59e3f4840851315623db44c4",
				"59e3f5248154d659da8ec947",
				"59e3f5a80876045ab860e5a3",
				"59e3f6c6f44c155c6c10fbf4",
				"59e3f6e79071415d20570883",
				"59e3f706fc0d885d81b10f3b",
				"59e3f71e88616e5e03f4d005",
				"59e3f76d310fb45f0f114ac5",
				"59e3f9cf964bc164ace57147",
				"59e3fb52a7256266a4757147"	
			];	

			//create category
			let arrCategorys = [];
			for(let i = 0; i< 15; i++){
				arrCategorys.push(faker.lorem.words(faker.random.number({min:2, max:4})));
			}
			//create tag
			let arrTags = [];
			for(let i = 0; i < 20; i++){
				arrTags.push(faker.lorem.words(faker.random.number({min:1, max:3})));
			}
			//create Quote
			let arrQuote = [];
			let numQuote = faker.random.number({min: 10, max: 20});
			for(let i = 0; i< numQuote; i++){
				let arrLikedUsers = [
					"59e3f4840851315623db44c4",
					"59e3f5248154d659da8ec947",
					"59e3f5a80876045ab860e5a3",
					"59e3f6c6f44c155c6c10fbf4",
					"59e3f6e79071415d20570883",
					"59e3f706fc0d885d81b10f3b",
					"59e3f71e88616e5e03f4d005",
					"59e3f76d310fb45f0f114ac5",
					"59e3f9cf964bc164ace57147",
					"59e3fb52a7256266a4757147"	
				];	
				let arrSavedUsers = [
					"59e3f4840851315623db44c4",
					"59e3f5248154d659da8ec947",
					"59e3f5a80876045ab860e5a3",
					"59e3f6c6f44c155c6c10fbf4",
					"59e3f6e79071415d20570883",
					"59e3f706fc0d885d81b10f3b",
					"59e3f71e88616e5e03f4d005",
					"59e3f76d310fb45f0f114ac5",
					"59e3f9cf964bc164ace57147",
					"59e3fb52a7256266a4757147"	
				];
				let catArrLength = faker.random.number({min:1, max:4});
				let arrCategory = [];
				for(let i = 0; i< catArrLength; i++){
					arrCategory.push(arrCategorys[faker.random.number({min:0,max:arrCategorys.length-1})]);
				}
				let tagArrLength = faker.random.number({min:1, max: 4});
				let arrTag = [];
				for(let i = 0; i < tagArrLength; i++){
					arrTag.push(arrTags[faker.random.number({min: 0, max:arrTags.length-1})]);
				}	
				//create liked_user
				let likedUserArrayLength = faker.random.number({min:1, max: 10});
				let arrLikedUser = [];
				for(let i = 0; i < likedUserArrayLength; i++){
					let position = faker.random.number({min: 0, max: arrLikedUsers.length-1}); 
					let element = arrLikedUsers.splice(position,1);
					//console.log("arrLikedUser->element:"+element);
					arrLikedUser.push(element);
				}
				//create saved_user
				let savedUserArrayLength = faker.random.number({min:1, max: 10});
				let arrSavedUser = [];
				for(let i = 0; i < savedUserArrayLength; i++){
					let position = faker.random.number({min: 0, max: arrSavedUsers.length-1});
					let element = arrSavedUsers.splice(position,1); 
					//console.log("arrSavedUser->element:"+element);
					arrSavedUser.push(element);
				}

				arrQuote.push({
					content: faker.lorem.sentences(faker.random.number({min:3, max:6})),
					author: faker.name.findName(),
					created_by: arrAuthIDs[faker.random.number({min:0, max: arrAuthIDs.length-1})], 
					categorys: arrCategory,
					tags: arrTag,
					liked_user: arrLikedUser,
					saved_user: arrSavedUser
				});
			}

			Quote.insertMany(arrQuote, function(err, quotes){
				if(err) return done(err);
				assert.equal(Object.keys(quotes).length, numQuote);
				done();
			});
		});

		it("Find User info from Quote", function(done){
			Quote.findOne({created_by: "59e40410eeb6c4775bf67ca3"})
				.populate('created_by', 'local')
				.exec(function(err, quote){
					if(err) return done(err);
					assert.equal(quote.created_by.local.email,"dangthedoan@gmail.com");
					done();
				});
		});

		it("Get total liked and saved", function(done){
			Quote.findOne({_id: "59e4a26070df094f7f992617"})
				.exec(function(err, quote){
					if(err) return done(err);
					assert.equal(quote.liked_user.length,4);
					assert.equal(quote.saved_user.length,3);
					done();
				});	
		});

		it("Get list liked saved user", function(done){
			Quote.findOne({_id: "59e4a26070df094f7f992617"})
				.populate('liked_user saved_user')
				.exec(function(err, quote){
					if(err) return done(err);
					//console.log(quote.liked_user);
					//console.log("--------");
					//console.log(quote.saved_user);
					assert.equal(quote.liked_user.length,4);
					assert.equal(quote.saved_user.length,3);
					done();
				});
		});

		it("Add liked user", function(done){
			//	
			Quote.findOne({_id: "59e4a26070df094f7f992617"})
				.exec(function(err, quote){
					if(err) return done(err);
					let likedUserID = "59e3fb6c30bccb6725171703";
					let isExistlikedUserID = false;
					if(quote.liked_user.length > 0){
						for(let i = 0; i < quote.liked_user.length; i++){
							if(quote.liked_user[i] == likedUserID){
								isExistlikedUserID = true;
								break;
							}
						}
					}
					if(!isExistlikedUserID){
						quote.liked_user.push(likedUserID);
						quote.save(function(err, quote){
							if(err) return done(err);
							//console.log(quote.liked_user[quote.liked_user.length -1]);
							assert.equal(quote.liked_user[quote.liked_user.length -1],likedUserID);
							done();
						});
					}
				});
		});

		it("Remove liked user", function(done){
			Quote.findOne({_id: "59e4a26070df094f7f992617"})
				.exec(function(err, quote){
					if(err) return done(err);
					let likedUserID = "59e3fb6c30bccb6725171703";
					let isExistlikedUserID = false;
					if(quote.liked_user.length > 0){
						for(let i = 0; i < quote.liked_user.length; i++){
							if(quote.liked_user[i] == likedUserID){
								isExistlikedUserID = true;
								break;
							}
						}
					}
					if(isExistlikedUserID){
						quote.liked_user.pop();
						quote.save(function(err, quote){
							if(err) return done(err);
							//console.log(quote.liked_user[quote.liked_user.length -1]);
							assert.notEqual(quote.liked_user[quote.liked_user.length -1],likedUserID);
							done();
						});
					}
				});

		});

		/*
		 * because liked_user is array so we just need to give 
		 * value of one element we want looking for
		 */
		it("Get number liked of user", function(done){
			Quote.find({ liked_user:  "59e3f9cf964bc164ace57147" })
			.exec(function(err, quotes){
				if(err) return done(err);
				console.log("number liked:"+quotes.length);
				//console.log(quotes);
				done();
			});
			
			//done();
		});

		it.skip("Add saved user", function(done){
			//
		});

		it.skip("Remove saved user", function(done){
			//
		});

		it.skip("Find comment about quotes", function(done){

		});

	});
});
