fs = require('fs');
http = require('http');
url = require('url');


http.createServer(function(req, res){
	console.log(req);
	var request = url.parse(req.url, true);
	var action = request.pathname;
	console.log(action);
	if (action == '/pixel') {
		var img = fs.readFileSync('./public/images/onepixel.png');
		res.writeHead(200, {'Content-Type': 'image/png' });
		res.end(img, 'binary');
	} else { 
		res.writeHead(200, {'Content-Type': 'text/plain' });
		res.end('Hello World \n');
	}
}).listen(8080, '127.0.0.1');
