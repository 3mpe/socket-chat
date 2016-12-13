const { fallow }  = require('../controller/user')
const { message } = require('../controller/message')

function loadApp(server, io) {

	/* Listening with a single connection */
	io.on('connection', function (socket) {
		fallow.listen(socket); 
		message.listen(socket);
	});

};

module.exports = { loadApp };

