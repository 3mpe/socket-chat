const { fallow }  = require('../controller/fallow');
const { message } = require('../controller/message');
const { notification } = require('../controller/notification');

function loadApp(server, io) {

	/* Listening with a single connection */
	io.on('connection', function (socket) {
		notification.listen(socket);
		fallow.listen(socket);
		message.listen(socket);
	});

};

module.exports = { loadApp };
