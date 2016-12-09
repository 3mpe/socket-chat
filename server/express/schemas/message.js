const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const userMessageSchema = Schema({
	conversations: [{ type: Schema.Types.ObjectId, ref: 'conversations' }],
	name: {
		type: String
	},
	message: {
		type: String
	}
});

module.exports = userMessageSchema;

