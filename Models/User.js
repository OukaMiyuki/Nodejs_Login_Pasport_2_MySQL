const Sequelize = require('sequelize');
const Joi = require('joi');
const db = require('../Config/db');

const User = db.define(
    "user", {
        name: {
            type: Sequelize.STRING,
            min: 6,
            max: 10,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            min: 5,
            max: 20,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            min: 8,
            max: 255,
            allowNull: false
        }
    }, { freezeTableName: true }
);

const mediumRegex = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{5,255}$/);

function validateInput(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(8).max(255).pattern(mediumRegex).required().messages({
            "string.base": "Sorry! It looks like something went wrong. Please try later",
            "string.pattern.base": "The password should be contain atleat 1 lower and uppercase alphabetical character, 1  numeric character, 1 special  and 5 character long!",
            "string.empty": "Password should not be an empty!",
            "any.required": "Password is required"
        }),
        password2: Joi.string().required().valid(Joi.ref('password')).error((errors) => new Error('Password didn\'t match!'))
    });

    return schema.validate(user);
}

exports.User = User;
exports.validate = validateInput;