var mongoose = require('mongoose');
const fallowSchema = mongose.Schema({
	name: {
		first: String,
		last: String
	},
	folow_users: [{
		user_id: Number
	}]
});

module.exports = fallowSchema;

