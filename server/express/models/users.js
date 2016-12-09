const mongoose = require('mongoose');
const user = require('../schemas/user');
var Users = mongoose.model('user', user);

module.exports = Users;

