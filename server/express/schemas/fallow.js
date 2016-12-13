var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var fallowSchema = Schema({
	user_id: { type: String },
	fallowing: [{
			fallowing_id: String,
			name: { first: String, last: String },
			status:String
		}],
	fallowed: [{
			fallowed_id: { type: String },
			name: { first: String, last: String },
			status:String
		}]
});

module.exports = fallowSchema;

