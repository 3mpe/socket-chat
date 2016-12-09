var mongoose = require('mongoose');
var fallowSchema = require('../schemas/fallow');
var fallow = mongoose.model('fallow', fallowSchema);

module.exports = fallow;

