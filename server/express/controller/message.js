const conversations = require('../models/conversations');
const message = require('../models/message');
const User = require('../models/users');

const message_ = {};


function update(params, updateParams, calback) {
	if (calback instanceof Function) {
		Conversations.findByIdAndUpdate(params, updateParams, calback());
	}
};

message_.index = function (req, resp, next) {
	/* user id and reciver find */
	conversations.find({} , {_id : 0})
		.or([{ 'sender_id': req.cookies.foundUser._id },
			{ 'reciver_id': req.params.reciver_id }
		])
		.populate('message')
		.select('sender_id reciver_id conversations_hid message name')
		.exec(function (error, conversationsData) {
			if (error) { resp.json({ message: error.errors }); }
			return resp.json({ data: conversationsData });
		});
};


message_.storesender = function (req, resp, next) {

	/* send message reciver_id  */
	const Conversations = new conversations({
		sender_id: req.cookies.foundUser._id,
		reciver_id: req.params.reciver_id,
		status: 'Active'
	});

	Conversations.save(function (error, data) {
		if (error) {
			return resp.json({ error: error.errors });
		}
		const Message = message({
			conversations_hid: data._id,
			name: req.cookies.foundUser.name.first,
			message: req.body.message
		});

		Message.save(function (error, MessageItem) {
			if (error) {
				return resp.json({ error: error.errors });
			}
			return resp.json({ message: 'successful', data: MessageItem });
		});

		Conversations.message.push(Message);
		Conversations.save();
	});

};
message_.storereciver = function (req, resp, next) {

	const Conversations = new conversations({
		sender_id: resp.params.sender_id,
		reciver_id: request.cookies._id
	});

	Conversations.save(function (error, data) {
		const Message = message({
			conversations_hid: data._id,
			name: data.name.first,
			message: response.body.message,
			status: 'Active'
		});

		Message_.save(function (error, MessageItem) {
			if (error) {
				return resp.json({ error: error.errors });
			}
			return resp.json({ message: 'successful', data: MessageItem });
		});
	});
};
message_.deletesender = function (req, resp, next) {
	update({ sender_id: request.cookies._id, reciver_id: req.params.reciver_id }, { status: 'Deleted' });
};
message_.deletereciver = function (req, resp, next) {
	update({ sender_id: req.params.sender_id, reciver_id: request.cookies._id }, { status: 'Deleted' });
}
module.exports = {
	message: message_
}
