const conversations = require('../models/conversations');
const message = require('../models/message');

const message_ = {};


function findUser(request, response, calback) {
	User.find({ token: request.token }, function (error, foundUser) {
		if (error) { response.json({ message: error.errors }); }
		if (calback instanceof Function) {
			calback(foundUser);
		}
	});
};

function update(params, updateParams, calback) {
	if (calback instanceof Function) {
		Conversations.findByIdAndUpdate(params, updateParams, calback());
	}
};

message_.index = function (req, resp, next) {
	findUser(req, resp, function (foundUser) {
		/* user id and reciver find */
		conversations.find({ $or: [{ 'sender_id': foundUser._id }, { 'reciver_id': foundUser._id }] })
			.sort("updatedAt", -1)
			.exec(function (error, conversationsData) {
				if (error) { resp.json({ message: errors.errors }); }
				return resp.json({ data: conversationsData });
			});
	});
};
message_.storesender = function (req, resp, next) {
	/* send message reciver_id  */
	findUser(req, resp, function (foundUser) {
		const Conversations = new conversations({
			sender_id: foundUser._id,
			reciver_id: resp.params.reciver_id
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

	});

};
message_.storereciver = function (req, resp, next) {
	findUser(req, resp, function (foundUser) {
		const Conversations = new conversations({
			sender_id: resp.params.sender_id,
			reciver_id: foundUser._id
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

	});
};
message_.deletesender = function (req, resp, next) {
	findUser(req, resp, function (foundUser) {
		update({ sender_id: foundUser._id, reciver_id: req.params.reciver_id }, { status: 'Deleted' });
	});
};
message_.deletereciver = function (req, resp, next) {
	update({ sender_id: req.params.sender_id, reciver_id: foundUser._id }, { status: 'Deleted' });
}
module.exports = {
	message: message_
}

