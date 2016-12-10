const jwt = require('jsonwebtoken');
var token = jwt.sign({ secret: 'bu gizli bir bilgidir' }, 'shhhhh');

module.exports = token;

