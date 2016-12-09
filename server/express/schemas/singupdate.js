var mongoose = require('mongoose');
const singUpDateSchema = mongose.Schema({
	singup: {
		type: Date,
		default: Date.now()
	}
});

module.exports = singUpDateSchema;

