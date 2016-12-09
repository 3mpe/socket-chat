const mongoose = require('mongoose');
var conversationsSchema = require('../schemeas/conversations');
var conversations = mongoose.model('conversations', conversationsSchema);

module.exports = conversations;

