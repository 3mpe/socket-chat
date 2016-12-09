var mongoose = require('mongoose');
var messageSchema = require('../schemas/message');
var message = mongoose.model('message', messageSchema);

module.exports = message;

