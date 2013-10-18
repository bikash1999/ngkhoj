var ngpediaApi = require('./ngpedia-api');
var sio = null,
	config = {};

var me = this;

exports.init = function(config, callback) {
	console.log('ngpedia-socket init()');
	me.config = config;
	callback && callback();
};


exports.sendNotificationForApproval = function(userId, data) {
	var context = userId;
	console.log('emitting an event');
	me.sio.sockets. in (context).emit(userId, data);
}

exports.listen = function(sio) {
	console.log('ngpedia-socket listen()');
	me.sio = sio;

	me.sio.sockets.on('connection', function(socket) {
		console.log('waiting for client for approval request');
		// once a client has connected, we expect to get a ping from them saying what room they want to join
		socket.on('subscribe-new-notification', function(context) {
			socket.join(context.userId);
		});
	});
};