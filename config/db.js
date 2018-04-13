// Build the connection string
var dbURI = "mongodb://localhost/danhngon";
module.exports = function(mongoose) {
	// Create the database connection
	mongoose.connect(dbURI);

	mongoose.connection.on("connected", function() {
		console.log("Mongoose connected to ", dbURI);
	});
	mongoose.connection.on("error", function(err) {
		console.log("Mongoose connection error: ",err);
	});
	mongoose.connection.on("disconnected", function() {
		console.log("Mongoose disconnected");
	});
	// Closing when the NODE process ends
	process.on("SIGNINT", function() {
		mongoose.connection.close(function() {
			console.log("Mongoose disconnected through app termination");
			process.exit(0);
		});
	});

}
