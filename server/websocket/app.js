const userSocket = require('./socketserveruser.js');

function loadApp(server) {
	var io = require('socket.io')(server);
	userSocket.userSocket(server, io);
}

module.exports = { loadApp };

