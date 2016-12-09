const mongoose = required('mongoose');
const Schema = mongoose.Schema;

const conversationsSchema = Schema({
	sender_id : {
		type:String
	}
	reciver_id:{
		type:String
	}
});

module.exports = conversationsSchema;