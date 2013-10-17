var express = require('express');
var io = require('socket.io');
var path = require('path');
var ngpediaStatic = require('./lib/ngpedia-static'),
	ngpediaRest = require('./lib/ngpedia-rest'),
	ngpediaSocket = require('./lib/ngpedia-socket'),
    ngpediaDb = require('./lib/ngpedia-db');

var config = {
	ngpediaDb: {
     host:'localhost',
     dbName:'ngpedia',
     username:'',
     password:''
	},
	webroot: __dirname + '/..'
};

var port = process.env.PORT || 3000;
var app = express();
var server = app.listen(port);
var sio = io.listen(server);
console.log('Server listening at %s', port);

//Creating ngpedia-DB Server
ngpediaDb.init(config);

//Creating ngpedia-STATIC Server
ngpediaStatic.init(config, function(){
	ngpediaStatic.listen(app);
});

//Creating ngpedia-REST Server
ngpediaRest.init(config, function(){
	ngpediaRest.listen(app);
});

//Creating ngpedia-Socket Server
ngpediaSocket.init(config, function(){
	ngpediaSocket.listen(sio);
});
