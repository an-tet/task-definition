const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'The password must be mandatory']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'The email must be mandatory']
    },
    facebook: {
        type: Boolean,
        default: false
    }
});

userSchema.methods.toJSON = function () {
    let userObject = this.toObject();
    delete userObject.password;
    return userObject;
};

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);