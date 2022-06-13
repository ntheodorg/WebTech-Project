
const fs = require('fs');
const staticRoutes = require("../models/routesModel").staticRoutes;
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: ''};

    // Duplicate email error
    if(err.code === 11000) {
        errors.email = 'This email is already used;';

        return errors;
    }

    // Validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}
const maxAge = 3 * 60 * 60 * 24
const createToken = (id) => {
    return jwt.sign({ id }, 'secretKey', {
        expiresIn: maxAge
    })
}

module.exports = {
    login: function(req, res) {
        const { email, password } = req.body;
        console.log(email, password);

        res.send("Login");
    },
    signup: async function(req, res) {
        const { email, password } = req.body;
        console.log(email, password);


        try {
            const user = await User.create({email, password});
            const token = createToken(user._id);
            res.cookie('jwt', token, `HttpOnly; Max-Age=${maxAge * 1000}`);


            res.status(201).json({user: user._id});

        } catch (err) {
            const errors = handleErrors(err)
            console.log(errors)

            res.status(404).json({ errors: errors});
        }

    }

}