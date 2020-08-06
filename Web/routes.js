const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const home = require('../Routes/index');
const users = require('../Routes/users');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
require('../Config/passport')(passport); //passing passport to /Config/passport.js (line 5)

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

    //have to put this after the express session middleware
    //pasport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    //global var
    app.use((req, res, next) => { //creating global variables
        res.locals.sukses = req.flash('sukses'); //message when register is success
        res.locals.gagal = req.flash('gagal'); //message when register is failed
        res.locals.error_login = req.flash('error'); //message when login is failed
        next();
    });

    //routes
    app.use('/', home);
    app.use('/api/users', users);
}