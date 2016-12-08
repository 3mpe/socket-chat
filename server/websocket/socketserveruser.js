function userSocket(server, io) {

	io.on('connection', function (socket) {
		socket.on('subscribe', function (data) {
			//console.log(data);
			data.rooms.forEach(function (ele) {
				socket.join(ele);
			});
		});
		socket.on('add_comment', function (data) {

		});
	});

};

module.exports = userSocket;

