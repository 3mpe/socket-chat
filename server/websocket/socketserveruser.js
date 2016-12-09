function userSocket(server, io) {

	io.on('connection', function (socket) {
		socket.on('subscribe', function (data) {
			console.log(data);

		});
		socket.on('add_comment', function (data) {
			console.log(data);

		});
	});

};

module.exports = { userSocket };

