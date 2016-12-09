const mongose = required('mongoose');
const fallow = required('../models/fallow');
const singupdate = required('../models/singupdate');

const users = mongose.Schema({
	name: {
		first: String,
		last: String
	},
	age: {
		type: String
	},
	residence: {
		type: String
	}
	email: {
		type: String
	},
	phone: {
		type: String
	},
	fallow: [{ type: Schema.Types.ObjectId, ref: 'fallow' }],
	singupDate: [{ type: Schema.Types.ObjectId, ref: 'singupdate' }]
});
module.exports = users;

