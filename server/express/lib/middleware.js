// Modules
const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const dbconnect = require('./dbconnect');
var User = require('../models/users');

// Init
const middleware = {};

middleware.load = function (app) {

	app.use(function (request, response, next) {
		response.header("Access-Control-Allow-Origin", "http://localhost:3000");
		response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		next();
	});

	app.use('/socket.io.js',express.static('node_modules/socket.io-client/socket.io.js'));
	app.use(logger('dev'));
	app.use(cookieParser({ scret: config.scret }));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(function (req, res, next) {
		// check header or url parameters or post parameters for token
		if (req.url !== "/user/store" && req.url !== "/user/login") {
			var token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'];
			//decode token
			if (token) {
				const jwt = require('jsonwebtoken');
				jwt.verify(token, 'shhhhh', function (err, decoded) {
					if (err) { res.json({ success: false, message: 'Failed to authenticate token.' }); }
					req.token = token;
					req.cookies.token = token;
					next();
				});
			} else {
				res.send(403);
			}
		} else { next(); }
	});

	app.use(function (req, resp, next) {
		if (req.url !== "/user/store" && req.url !== "/user/login") {
			if (req.cookies.token) {
				User.findOne({ token: req.cookies.token }, { __v: 0 }, function (error, foundUser) {
					if (error) { resp.json({ message: error.errors }); }
					if (foundUser === null ) { resp.json({message: 'user not found . '}); }
					req.cookies.foundUser = foundUser;
					next();
				});
			}
		} else { next(); }
	});

};

module.exports = middleware;
