const mongoose = require("mongoose");
const Joi = require("joi");
const { model, Schema } = mongoose;

const createGenreSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`,
        "string.max": `"name" should have maximum length of {#limit}`
    }),
});

const updateGenreSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': `"name" should be a type of 'text'`,
        'string.empty': `"name" cannot be an empty field`,
        'string.min': `"name" should have a minimum length of {#limit}`,
        'any.required': `"name" is a required field`,
        "string.max": `"name" should have maximum length of {#limit}`
    }),
});

const genreSchema = new Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 50 },
});

const Genre = model("Genre", genreSchema);

module.exports = {
    createGenreSchema,
    genreSchema,
    Genre,
    updateGenreSchema
};