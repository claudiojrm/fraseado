var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(3002, '138.197.69.226');
console.log('Server running at http://138.197.69.226:3002/');