const { User, validate } = require('../Models/User');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

router.post('/register', async(req, res) => {
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
        const checkUserExists = await User.findAndCountAll({
            where: {
                [Op.or]: [
                    { name: req.body.name },
                    { email: req.body.email }
                ]
            }
        }).catch((err) => console.log(err.message));
        if (checkUserExists.count > 0) {
            const errors = 'Username or Email has already been registered!';
            return res.status(400).render('register', {
                errors,
                name,
                email,
                password,
                password2
            });
        }

    }
});

module.exports = router;