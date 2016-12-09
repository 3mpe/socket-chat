const userSocket = require('./socketserveruser.js');

function load(server) {
	var io = require('socket.io')(server);
	userSocket.load(server, io);
}

module.exports = load;

