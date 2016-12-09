'use strict'

// Dependencies
const express = require('./server/node_modules/express');
const middleware = require('./server/express/lib/middleware');

// Create new express application
const app = express();

// Middleware
middleware.load(app);
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

