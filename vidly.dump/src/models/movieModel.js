const Joi = require("joi");
const mongoose = require("mongoose");
const joiObjectid = require("joi-objectid");
const { genreSchema } = require("./genresModel");

const { model, Schema } = mongoose;
Joi.objectId = joiObjectid(Joi);

const movieSchema = new Schema({
    title: { type: String, required: true, trim: true, minlength: 1, maxlength: 255 },
    genre: { type: genreSchema, required: true },
    numberInStock: { type: Number, default: 0, min: 0, max: 255 },
    dailyRentalRate: { type: Number, default: 0, min: 0, max: 255 }
})

const Movie = model("Movie", movieSchema);

const createMovieSchema = Joi.object({
    title: Joi.string().required(),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255),
});

module.exports = { Movie, createMovieSchema, movieSchema }