'use strict'

// Dependencies
const express = require('express');
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
const socket = require('./server/websocket/app');
socket.load(server);

module.exports = app;

