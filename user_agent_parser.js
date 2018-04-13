const http = require('http');
var UAParser = require('ua-parser-js');
const server = http.createServer((req, res) => {
	const ip = res.socket.remoteAddress;
	const port = res.socket.remotePort;
	var parser = new UAParser();
	var ua = req.headers['user-agent'];     // user-agent header from an HTTP request 
	var resultUserAgent = parser.setUA(ua).getResult();
	resultUserAgent.requestIP = ip;
	console.log(resultUserAgent);
	res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
