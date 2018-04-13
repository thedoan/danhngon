const http = require('http');
const useragent = require("useragent");
const server = http.createServer((req, res) => {
	const ip = res.socket.remoteAddress;
	const port = res.socket.remotePort;
	var agent = useragent.parse(req.headers['user-agent']);
	console.log("---useragent.parse()---");
	console.log(agent);
	console.log("---End useragent.parse()---");
	console.log("---Agent OS---");
	console.log(agent.os);
	console.log("---End Agent OS---");

	console.log("---useragent.is()---");
	var ua = useragent.is(req.headers['user-agent']);
	console.log(ua);
	console.log("---End useragent.is()---");
	console.log("Your user agent is:"+req.headers['user-agent']);
	res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3000);
