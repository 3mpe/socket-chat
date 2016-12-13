const mongoose = require('mongoose');
var conversationsSchema = require('../schemas/conversations');
var conversations = mongoose.model('conversations', conversationsSchema);

module.exports = conversations;

