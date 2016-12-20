const fallow = {};

fallow.listen = function (socket) {
	server.on('fallow',function ( socketData ) {
		socket.emit('fallow:emit', {	message:' You are being followed :) '	});
	});
};


module.exports = { fallow }
