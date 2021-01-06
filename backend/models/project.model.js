const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let projectSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'The title is required']
    },
    description: {
        type: String,
        required: false
    },
    // task: {
    //     type: Boolean,
    //     default: false
    // }
});

projectSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Project', projectSchema);