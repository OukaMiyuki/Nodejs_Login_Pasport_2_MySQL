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
            errors, //passing the error messages (check /views/partial/messages.ejs) on the first line you'll find errors, whic is after the view rendered it'll include the message and show the errors
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
        if (checkUserExists.count > 0) { //if user exists
            const errors = 'Username or Email has already been registered!';
            return res.status(400).render('register', {
                errors, //passing the error messages (check /views/partial/messages.ejs) on the first line you'll find errors, whic is after the view rendered it'll include the message and show the errors
                name,
                email,
                password,
                password2
            });
        } else { //else add or register the user
            const user = new User({
                name,
                email,
                password
            });

            await bcrypt.genSalt(10, (err, salt) => bcrypt.hash( //hashing the password
                user.password, salt, async(err, hash) => {
                    if (err) throw err; //if hashing failed
                    user.password = hash; //if hashing succes then initialize the user.password (line 49) to hashed password
                    await user.save() //save the user to the database
                        .then(user => {
                            req.flash('sukses', 'You are now registered!'); //send success alert
                            res.redirect('/api/users/login'); //redirect to login view
                        })
                        .catch(err => console.error(err));
                }
            ));
        }

    }
});

module.exports = router;