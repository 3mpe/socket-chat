var mongoose = require('mongoose');
var host, port, username, password, database, url;

if (process.env.SERVER_SOFTWARE == 'bae/3.0') {
	host = 'mongo.duapp.com';
	username = "78b39e5c37054e82865b9d2bda504946",
		password = "d61d4f7285e44b7083000c287f65074f",
		database = 'PjglzFtxflHrqMcLpLuu';
	port = 8908;
	url = "mongodb://" + username + ":" + password + "@" + host + ":" + port + "/" + database;
} else {
	host = '127.0.0.1';
	database = 'blog';
	port = 12345;
	url = "mongodb://127.0.0.1:12345/blog";
}


var recon = true;

function getConnect() {
	var opts = {
		db: { native_parser: true },
		server: { poolSize: 5, auto_reconnect: true },
		user: username,
		pass: password
	};
	// mongoose.connect("mongodb://HahMqSkZWUq9QWHsWceXmG83:XH82hOf5MGzoMUMUkCNj0KdBvecF3mzP@mongo.duapp.com:8908/pQPzvWlctdHpUjrbtFnX");
	// mongoose.connect("mongodb://" + username + ":" + password +"@"+ host + ":" + port + "/" + dbName);
	mongoose.connect(url, opts);
	var dbcon = mongoose.connection;
	// var dbcon = mongoose.createConnection(url, opts);  
	dbcon.on('error', function (error) {
		console.log('connection error');
		// throw new Error('disconnected,restart');  
		dbcon.close();
	});

	dbcon.on('disconnected', function () {
		console.log('disconnected');
		dbcon.close();
	});
	dbcon.on('open', function () {
		console.log('connection success open');
		recon = true;
	});
	dbcon.on('close', function (err) {
		console.log('closed');
		// dbcon.open(host, dbName, port, opts, function() {  
		// console.log('closed-opening');  
		// });  
		reConnect('*');
	});

	function reConnect(msg) {
		console.log('reConnect' + msg);
		if (recon) {
			console.log('reConnect-**');
			dbcon.open(host, database, port, opts, function () {
				console.log('closed-opening');
			});
			recon = false;
			console.log('reConnect-***');
		};
		console.log('reConnect-end');
	}
}

exports.getConnect = getConnect;

exports.mongoose = mongoose;

