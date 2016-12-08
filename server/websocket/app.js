const userSocket = require('./socketserver.js');

function load(server) {
	var io = require('socket.io')(server);
	userSocket.load(server, io);
}

module.exports = load;

