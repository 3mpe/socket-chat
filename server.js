const app = require('./server/express/app');
const http = require('http');
const server = http.createServer(app);
const port = 8080;

/**
 * Api port 
 */
server.listen(port, function () {
	console.log(`localhost:${port} started.`)
});

/**
 * Load socket
 */
const socket_ = require('./server/websocket/app');
socket_.loadApp(server);

module.exports = app;

