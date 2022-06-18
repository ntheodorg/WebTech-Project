const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '', age: 'ceva'};

    // Incorrect email
    if(err.message === 'Incorrect email') {
        errors.email = 'This email is not registered'
    }

    // Incorrect password
    if(err.message === 'Incorrect password') {
        errors.email = 'Wrong password'
    }

    // Duplicate email error
    if(err.code === 11000) {
        errors.email = 'This email is already used;';

        return errors;
    }

    // Validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach((error) => {
            const properties = error.properties
            if(properties === undefined){
                errors[error.path.split('.').pop()] = 'Invalid input'
                return
            }

            //  = properties.message.split('.').reduce((o,i)=> o[i], errors);
            errors[properties.path] = properties.message
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
    login: async function (req, res) {
        const {email, password} = req.body;

        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);

            res.cookie('jwt', token, `HttpOnly; Max-Age=${maxAge * 1000}; Path=/`);
            res.status(201).json({user: user._id});

        } catch (err) {
            const errors = handleErrors(err)

            res.status(400).json({ errors });
        }
    },
    signup: async function(req, res) {
        let simpleUser = {
            email: req.body.email,
            password: req.body.password,
            accountType: 'user',
            details : {
                name: req.body.name,
                forename: req.body.forename,
                age: req.body.age
            }
        }
        try {
            const user = await User.create(simpleUser);
            const token = createToken(user._id);
            res.cookie('jwt', token, `HttpOnly; Max-Age=${maxAge * 1000}; Path=/`);


            res.status(201).json({user: user._id});

        } catch (err) {
            const errors = handleErrors(err)

            res.status(400).json({ errors });
        }

    },
    signup_SuperUser: async function(req, res) {
        let superUser = {
            email: req.body.email,
            password: req.body.password,
            accountType: 'superuser',
            details : {
                company_street: req.body.company_street,
                company_name: req.body.company_name,
                contact_number: req.body.contact_number
            }
        }
        try {
            const user = await User.create(superUser);
            res.status(201).json({user: user._id});

        } catch (err) {
            const errors = handleErrors(err)
            // console.log(errors)

            res.status(400).json({ errors });
        }

    },
    logout: function (req, res) {
        res.cookie('jwt', '', 'Max-Age=1; Path=/');

        res.redirect('/');
    }

}