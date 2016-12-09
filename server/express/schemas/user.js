const mongoose = require('mongoose');
const { fallow } = require('../models/fallow');
const { singupdate } = require('../models/singupdate');
const Schema = mongoose.Schema;

var users = Schema({
	token: 		{ type:  String},
	name: 	    { first: String, last: String },
	age: 	    { type:  String },
	residence:  { type:  String },
	email: 	    { type:  String, require: true },
	pass:       { type:  String, require: true },
	phone: 	    { type:  String },
	status:     { type:  String },
	fallow:     [{ type: Schema.Types.ObjectId, ref: 'fallow' }],
	singupDate: [{ type: Schema.Types.ObjectId, ref: 'singupdate' }]
});

module.exports = users;

