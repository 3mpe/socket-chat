const notification = {};
notification.loadApp = function (socket) {
	server.on('message:send',function	(socketData) {
		server.emit('notification:push', { message:' new notification ' });
	})
};
module.exports = { notification }
