const fallow = {};

fallow.listen = function (socket) {
	server.on('fallow',function ( id, socketData ) {
		socket.emit('fallow:emit', {	message:' You are being followed :) '	});
	});
};


module.exports = { fallow }
