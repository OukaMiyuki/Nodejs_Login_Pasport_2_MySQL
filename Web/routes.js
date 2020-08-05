const express = require('express');
const home = require('../Routes/index');
const users = require('../Routes/users');

module.exports = function(app) {
    app.use(express.json());
    app.use('/', home);
    app.use('/api/users', users);
}