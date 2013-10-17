var ngpediaApi = require('./ngpedia-api');
var sio = null,
	config = {};

var me = this;

exports.init = function(config, callback){
	console.log('ngpedia-socket init()');
	me.config = config;
	callback && callback();
};

var generateReservationLink = function(socket, restaurentId) {
	var link = ngpediaApi.generateLink(restaurentId);
	console.log('emitting an event');
	socket.emit(restaurentId, link);
};

exports.listen = function(sio){
	console.log('ngpedia-socket listen()');
	me.sio = sio;

	me.sio.sockets.on('connection', function(socket) {
		console.log('wait for client request for url.');

		//Subscription for new url request
		socket.on("subscribe-new-url", function(id) {
			console.log('found id for request: ' + id);
			var timerInterval = setInterval(function() {
				generateReservationLink(socket, id);
			}, 9000);

			socket.on('disconnect', function() {
				clearInterval(timerInterval);
				console.log('Timer is stopped for id: ' + id);
			});
		});
	});
};