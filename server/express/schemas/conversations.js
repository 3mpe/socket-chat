const message = require('../models/message');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationsSchema = Schema({
	sender_id: {
		type: String
	},
	reciver_id: {
		type: String,
	},
	message: [{ type: Schema.Types.ObjectId, ref: 'message' }],
	status: {
		type: String
	}
});

module.exports = conversationsSchema;
