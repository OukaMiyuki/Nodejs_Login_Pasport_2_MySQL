const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const home = require('../Routes/index');
const users = require('../Routes/users');

module.exports = function(app) {
    app.use(express.json());
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: false }));

    app.use('/', home);
    app.use('/api/users', users);
}