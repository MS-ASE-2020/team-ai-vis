var express = require('express');
var path = require('path');

var app = express();
app.use(express.static(path.join(__dirname, 'dist')));

var http = require('http');

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);

server.listen(port);