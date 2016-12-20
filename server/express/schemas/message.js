const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMessageSchema = Schema({
	conversations_hid: { type: Schema.Types.ObjectId, ref: 'conversations' },
	name: {
		type: String
	},
	message: {
		type: String
	}
}, { __v: false });

module.exports = userMessageSchema;
