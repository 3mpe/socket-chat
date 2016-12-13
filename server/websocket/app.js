const router = require('./lib/router');

function loadApp(server) {
	var io = require('socket.io')(server);
	/* To listen to one source */
	router.loadApp(server, io);
}

module.exports = { loadApp };

