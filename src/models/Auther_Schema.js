const mongoose = require('mongoose');

const auth = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 30
    },
    bio: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        match: [/^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/, 'Please fill a valid URL'],
        required: false
    },
    birthDate: {
        type: Date,
        default: null,
        required: false
    }
}, { timestamps: true })

module.exports = mongoose.model('Author',auth)