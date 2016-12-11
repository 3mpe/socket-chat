const jwt = require('jsonwebtoken');
const config = require('./config');
var token = jwt.sign({ secret: config.scret }, 'shhhhh');

module.exports = token;

