// Modules
const bodyParser = require('body-parser');
const session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Init
const middleware = {};

middleware.load = function (app) {

	app.use(function (request, response, next) {
		response.header("Access-Control-Allow-Origin", "http://localhost:3000");
		response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
		response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

		next();
	});

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'jade');


	app.use(logger('dev')); // günlük log saklamak için
	app.use(cookieParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));

	app.use(session({
		secret: 'keyboard cat',
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 3600000 },
		store: new MongoStore({
			mongooseConnection: bae.mongoose.connection
		})
	}));

	app.use(function (req, res, next) {
		if (req.session.loggedIn) {
			res.locals.authenticated = true;
			User.findById(req.session.loggedIn, function (err, doc) {
				if (err) return next(err);
				res.locals.me = doc;
				next();
			});
		} else {
			res.locals.authenticated = false;
			next();
		}
	});
};

module.exports = middleware;

