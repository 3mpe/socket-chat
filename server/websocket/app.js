const router = require('./lib/router');
var io = require('socket.io')(server);

function loadApp(server) {
	/* To listen to one source */
	router.loadApp(server, io);
}

module.exports = { loadApp };

