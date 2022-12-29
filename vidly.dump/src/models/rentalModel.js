const Joi = require("joi");
const mongoose = require("mongoose");
const joiObjectid = require("joi-objectid");
const { movieSchema } = require("./movieModel");
const moment = require("moment");

const { model, Schema } = mongoose;
Joi.objectId = joiObjectid(Joi);

const customerInRentalSchema = new Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    phone: { type: String, required: true, minlength: 8, maxlength: 20 },
    isGold: { type: Boolean, default: false }
});

const rentalSchema = new Schema({
    customer: { type: customerInRentalSchema, required: true },
    movie: { type: movieSchema, required: true },
    dateOut: { type: Date, required: true, default: Date.now() },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0, default: 0 }
});

rentalSchema.static("lookup", function (customerId, movieId) {
    return this.findOne({ "customer._id": customerId, "movie._id": movieId });
});

rentalSchema.methods.return = function () {
    this.dateReturned = Date.now();

    this.rentalFee = moment().diff(this.dateOut, "days") * this.movie.dailyRentalRate;
    this.movie.numberInStock++;
    
    return this.save();
};

const Rental = model("Rental", rentalSchema);

const createRentalSchema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
});

module.exports = { Rental, createRentalSchema };