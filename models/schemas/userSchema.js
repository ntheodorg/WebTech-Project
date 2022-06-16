const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { isEmail } = require('validator');

const UserSchema = new Schema({
    email : {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password : {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters']
    },
    accountType: {
        type: String,
        required: true
    },
    details: {
        name: {
            type: String,
            required:false
        },
        forename: {
            type: String,
            required:false
        },
        age: {
            type: Number,
            required:false
        },
        company_name: {
            type: String,
            required:false
        },
        company_street: {
            type: String,
            required:false
        },
        contact_number: {
            type: String,
            required:false
        }
    }
});


module.exports = UserSchema;