const { User, validate } = require('../Models/User');
const Sequelize = require('sequelize');
const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.send("Login Page");
});

router.get('/register', (req, res) => {
    res.send("Register Page");
});

module.exports = router;