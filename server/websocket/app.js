const router = require('./lib/router');

module.exports =  function (server) {
	var io = require('socket.io')(server);

	/* To listen to one source */
	router.loadApp(server, io);
}
