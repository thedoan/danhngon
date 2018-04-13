var UAParser = require('ua-parser-js');
var RequestInfo = require('../models/RequestInfo');
var fs = require('fs');
module.exports = function(req, res, next){
	console.log("req.url:"+req.url);
	console.log("req.originalUrl:"+req.originalUrl);
	const ip = res.socket.remoteAddress;
	const port = res.socket.remotePort;
	var parser = new UAParser();
	var ua = req.headers['user-agent'];     // user-agent header from an HTTP request 
	var resultUserAgent = parser.setUA(ua).getResult();
	resultUserAgent.requestIP = ip;
	var requestInfo = new RequestInfo(resultUserAgent);
	requestInfo.save(function(err){
		if(err) return next(err);
		let img = fs.readFileSync('./public/images/onepixel.png');
		res.writeHead(200, {'Content-Type': 'image/png' });
		res.end(img, 'binary');
	});
}
