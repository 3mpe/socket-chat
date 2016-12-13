const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userMessageSchema = Schema({
	conversations_hid: { type: String },
	name: {
		type: String
	},
	message: {
		type: String
	}
});

module.exports = userMessageSchema;

