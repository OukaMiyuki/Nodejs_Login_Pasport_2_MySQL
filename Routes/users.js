const { User, validate } = require('../Models/User');
const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render("login");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    const { error } = validate(req.body);

    if (error) {
        const errors = error;
        return res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        return res.send("Berhasil!");
    }
});

module.exports = router;