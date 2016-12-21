
const message = require('../../express/models/message');
const user = require('../../express/models/users');
const message_ = {};

message_.listen = function (socket) {

	//mongoose write
	socket.on('message:storesender',function (id, socketData) {
		/* send message reciver_id  */
		const Conversations = new conversations({
			sender_id: socketData.sender_id,
			reciver_id: socketData.reciver_id,
			status: 'Active'
		});
		Conversations.save(function (error, data) {
			if (error) {
				socket.emit('response:error', { error:error.errors });
			}
			const Message = message({
				conversations_hid: data._id,
				name: socketData.first,
				message: socketData.message
			});

			Message.save(function (error, MessageItem) {
				if (error) {
					socket.emit('response:error', { error:error.errors });
				}
				socket.emit('response:success', { message: 'successful', data: MessageItem  });

				// If the registration is successful - Send message to user
				socket.emit('message:send', { sender_id: socketData.sender_id , reciver_id: socketData.reciver_id, name: socketData.first, message: socketData.message });
			});

			Conversations.message.push(Message);
			Conversations.save();
		});

	});

	socket.on('message:send',function (id, socketData) {
		socket.emit('inbox', { name:socketData.first, message:socketData.message });
	});
};


module.exports = { message: message_ }
