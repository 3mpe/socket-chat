const notification = {};
notification.listen = function (socket) {
	server.on('message:send',function	(id, socketData) {
		server.emit('notification:push', { message:' new notification ' });
	})
};
module.exports = { notification }
