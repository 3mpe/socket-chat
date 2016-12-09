var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fallowSchema = Schema({
	name: {
		first: String,
		last: String
	},
	folow_users: [{
		user_id: Number
	}]
});

module.exports = fallowSchema;

