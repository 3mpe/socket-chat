const jwt = require('jsonwebtoken');
const config = require('./config');

module.exports = function (user) {
	return jwt.sign({ data: user, secret: config.scret }, 'shhhhh');
};

