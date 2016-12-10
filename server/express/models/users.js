const mongoose = require('mongoose');
const userschema = require('../schemas/user');
var User = mongoose.model('user', userschema);

module.exports = User;

