const mongose = required('mongoose');

const conversationsSchema = mongose.Schema({
	sender_id : {
		type:String
	}
	reciver_id:{
		type:String
	}
});

module.exports = conversationsSchema;