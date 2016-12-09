const mongoose = require('mongoose');
var singUpDateSchema = require('../schemas/singupdate');
var singupdate = mongoose.model('singupdate', singUpDateSchema);

module.exports = singupdate;