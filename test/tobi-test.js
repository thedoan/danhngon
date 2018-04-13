var tobi = require("tobi"),
	app = require("../app"),
	browser = tobi.createBrowser(app, {external: true});
describe("Test /login", function(){
	it("Input Email and Password", function(done){
		browser.get("/login", function(res, $){
			$("form")
				.fill({email: "dangthedoan@gmail.com", password: "abc@123"})
				.submit(function(res, $){
					res.should.have.status(200);
					res.should.have.header("Content-Length");
					res.should.have.header("Content-Type", "text/html; charset=utf-8");

					app.close();
					/*
					   $("ul.messages").should.have.one("li", "Successfully authenticated");
					   browser.get("/login", function(res,$){
					   res.should.have.status(200);
					   $("ul.messages").should.have.one("li", "Already authenticated");
					//We are finished testing, close the server
					app.close();
					});
					*/
				});

		});
		done();

	});

});

