const debug = require('debug')('app:genre');
const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: false
    },
    added: {
        type: Date,
        default: Date.now
    }
}));

function validate(genre) {
    return Joi.validate(genre, {
        name: Joi.string().min(3).max(20).required()
    });
}

exports.Genre = Genre;
exports.validate = validate;
