const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    user: {
        type: String,
        required: [true, 'El usuario es oblogatorio']
    },
    password: {
        type: String,
        required: [true, 'La clave es oblogatoria']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El email es oblogatorio']
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

userSchema.plugin(uniqueValidator, {
    message: '{PATH} debe ser unico'
});

module.exports = mongoose.model('User', userSchema);