// Modules
const bodyParser = require('body-parser');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var dbconnect = require('./dbconnect');

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

	//app.use(session({
	//	secret: 'gizli bilgi',
	//	resave: false,
	//	saveUninitialized: false,
	//	cookie: { maxAge: 3600000 },
	//	store: new MongoStore({
	//		mongooseConnection: dbconnect.mongoose.connection
	//	})
	//}));


	app.use(function (request, response, next) {
		var bearerToken;
		var bearerHeader = request.headers["Authorization"];
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			request.token = bearerToken;
			next();
		} else {
			//response.send(403);
			next();
		}

	});
};

module.exports = middleware;

