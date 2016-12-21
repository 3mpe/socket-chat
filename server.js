const app = require('./server/express/app');
const http = require('http');
const server = http.createServer(app);
const port = 8080;

/**
 * Load socket
 */
require('./server/websocket/app')(server);

/**
 * Api port
 */
server.listen(port, function () {
	console.log(`localhost:${port} started.`)
});

module.exports = app;
