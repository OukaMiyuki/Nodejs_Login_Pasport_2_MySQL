const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const home = require('../Routes/index');
const users = require('../Routes/users');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

module.exports = function(app) {
    app.use(express.json());
    app.use(expressLayouts);
    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: false }));

    //express session middlware
    app.use(session({
        secret: 'secret_key',
        resave: true,
        saveUninitialized: true
    }));

    app.use(flash());
    //global var
    app.use((req, res, next) => {
        res.locals.sukses = req.flash('sukses'); //when register is success
        res.locals.gagal = req.flash('gagal'); //when register is failed
        res.locals.error_login = req.flash('error'); //when login is failed
        next();
    });

    //routes
    app.use('/', home);
    app.use('/api/users', users);
}