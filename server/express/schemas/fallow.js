var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fallowSchema = Schema({
	follower_id: {
		type: String
	},
	followed_id: {
		type: String
	}
});


module.exports = fallowSchema;

