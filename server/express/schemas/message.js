const mongose = required('mongoose');

const userMessageSchema = mongose.Schema({
	conversations: [{ type: Schema.Types.ObjectId, ref: 'conversations' }],
	name: {
		type: String
	},
	message: {
		type: String
	}
});

module.exports = userMessageSchema;

