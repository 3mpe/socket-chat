var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const singUpDateSchema = Schema({
	singup: {
		type: Date,
		default: Date.now()
	}
});

module.exports = singUpDateSchema;

