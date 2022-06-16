const mongoose = require('mongoose');
const UserSchema = require('./schemas/userSchema');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');



// Fire function before DB save
UserSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);

    next();
});

UserSchema.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}

// // Fire function after DB save
// UserSchema.post('save', function (doc, next) {
//     console.log('new user created');
//     next();
// })


const User = mongoose.model('user', UserSchema);
module.exports = User;