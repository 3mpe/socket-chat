const notification = {};
notification.listen = function (socket) {
	socket.on('message:send',function	(id, socketData) {
		socket.emit('notification:push', { message:' new notification ' });
	})
};
module.exports = { notification }
