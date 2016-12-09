const mongoose = required('mongoose');
var conversationsSchema = required('../schemeas/conversations');
var conversations = mongoose.model('conversations', conversationsSchema);

module.exports = conversations;