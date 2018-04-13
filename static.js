var express = require('express');
var path = require('path');
module.exports = function(app) {
	//static setup
	app.use('/bootstrap/css', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')));
	app.use('/bootstrap/js', express.static(path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'js')));
	app.use('/popper', express.static(path.join(__dirname, 'node_modules', 'popper.js', 'dist', 'umd')));
	app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));
	app.use('/holder', express.static(path.join(__dirname, 'node_modules', 'holderjs')));
	app.use('/isotope-layout', express.static(path.join(__dirname, 'node_modules', 'isotope-layout','dist')));
	app.use('/javascripts', express.static(path.join(__dirname, 'public', 'javascripts')));
	app.use('/stylesheets', express.static(path.join(__dirname, 'public', 'stylesheets')));


}
