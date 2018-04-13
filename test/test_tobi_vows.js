var vows   = require('vows');
var assert = require('assert');
var tobi   = require('tobi')
app = require("../app"),
browser = tobi.createBrowser(app);
vows.describe('Login Form').addBatch({
	'Login Form Context':{ 
		topic: function () {
			var that = this;
			browser.get("/login", function(res, $){
				that.callback(null, res,$);	
			});
		},
		'Fill the login form': function (err,res, $) {
			if(err) { 
				assert.fail();
			}else{
				res.should.have.status(200);
			$("form")
				.fill({email: "dangthedoan@gmail.com", password: "abc@123"})
				.submit(function(res, $){
					res.should.have.status(200);
					res.should.have.header("Content-Length");
					res.should.have.header("Content-Type", "text/html; charset=utf-8");
				});
			}

		},
	}
}).export(module);
