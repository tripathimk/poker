function startServer(route, handle) {
	var http = require('http');
	var url = require('url');
	http.createServer(function(request, response) {
		var pathname = url.parse(request.url).pathname;
		console.log('Request received for' + pathname);
		var reviewData = "";
		request.setEncoding("utf-8");
		request.addListener("data", function(chunk) {
			reviewData += chunk;
			console.log("chunk: "+chunk);
		});
		
		request.addListener("end", function() {
			route(handle, pathname, response, reviewData);
		});

	}).listen('8888');
	console.log('server started');
}

exports.startServer = startServer;