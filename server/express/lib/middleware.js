// Modules
const config = require('./config');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const dbconnect = require('./dbconnect');

// Init
const middleware = {};

middleware.load = function (app) {

	app.use(function (request, response, next) {
		response.header("Access-Control-Allow-Origin", "http://localhost:3000");
		response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

		next();
	});

	app.use(logger('dev')); // günlük log saklamak için
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use('/user/store',function (request, response, next) {
		const userStore = require('../controller/user');
		userStore.store(request, response, next);
	});

	app.use(function (request, response, next) {
		  // check header or url parameters or post parameters for token
		  var token = req.body.token || req.query.token || req.headers['Authorization'];
		  //decode token
		  if (token) {
		  	const jwt = require('jsonwebtoken');
		  	jwt.verify(token, config.scret, function(err, decoded) {
		  		if (err) { res.json({ success: false, message: 'Failed to authenticate token.' }); }
		  		request.decoded  = decoded;
		  		next();
		  	});
		  }
		  else{
		  	response.send(403);
		  }
	});
};

module.exports = middleware;