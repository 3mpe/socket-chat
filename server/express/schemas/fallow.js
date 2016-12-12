var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fallowSchema = Schema({
	user_id: { type: String },
	fallowing: {
		user_id: String,
		name: { first: String, last: String }
	},
	fallowed: {
		user_id: { type: String },
		name: { first: String, last: String }
	}
});

module.exports = fallowSchema;

