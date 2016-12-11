'use strict'
// Dependencies
const express = require('express');
const middleware = require('../express/lib/middleware');
const crud_route = require('../express/lib/route');

// Create new express application
const app = express();

// Middleware
middleware.load(app);
crud_route.load(app);


module.exports = app;