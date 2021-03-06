var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var logallerror = require('./middleware/logallerror');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash    = require('connect-flash');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
// Handler db connection
require("./config/db")(mongoose);
var routes = require("./routes");
var app = express();
require('./config/passport')(passport);
var commonsMiddleware = require("./middleware/commons");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
require("./static")(app);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret:'kaizen life', 
	cookie:{},
	/*Store session in MongoDB*/
	store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(path.join(__dirname, 'public')));

//app.use(cookieParser());
require('./config/app_settings')(app);
app.use(commonsMiddleware);

routes(app,passport);

// catch 404 and forward to error handler
/*
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});
*/
app.use(logallerror);
// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	switch(err.status) {
		case 404: {
			res.render('404', {title: "404 File Not Found", user: req.user, err });
			break;
		}
		default: {
			res.render('500', {title: "505 Internal Server Error", user: req.user, err });
		}
	}
	// render the error page
	/*
	res.status(err.status || 500);
	res.render('error', err);
	*/
});

module.exports = app;
