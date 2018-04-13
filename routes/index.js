module.exports = function(app, passport){
	// Test Route
	require("./test")(app, passport);
	// API Route
	require("./api")(app, passport);
	// Web Route
	require("./web")(app, passport);
}


