'use strict'
// Dependencies
const express = require('express');
const middleware = require('../express/lib/middleware');

// Create new express application
const app = express();

// Middleware
middleware.load(app);

/* crud operations */
const { userCrud } = require('./controller/user');

app.post('/user/login', userCrud.login);
app.post('/user/store', userCrud.store);
app.put('/user/update/:user_id', userCrud.update);
app.delete('/user/delete/:user_id', userCrud.delete);

module.exports = app;