const { Router } = require("express");
const Fawn = require("fawn");
const { Customer } = require("../models/customerModel");
const { Movie } = require("../models/movieModel");
const { Rental } = require("../models/rentalModel");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { createRentalSchema } = require("../models/rentalModel");

const createRental = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res
            .status(404)
            .json({ "message": "Customer not found" })

        const movie = await Movie.findById(req.body.movieId)
        if (!movie) return res
            .status(404)
            .json({ "message": "Movie not found" });

        if (movie.numberInStock <= 0) return res
            .status(400)
            .json({ "message": "Movie not in stack" })

        const rental = new Rental({ customer, movie });
        // const savedRental = await rental.save();

        movie.numberInStock--;
        await movie.save();

        // const task = new Fawn.Task();
        // task
        //     .save("rentals", rental)
        //     .update("movies", { _id: movie._id }, { $inc: { numberInStock: -1 } })
        //     .run();

        return res.status(201).json(rental);
    } catch (err) {
        console.log(err);
        return next(err);
    }
};

const getRentals = async (req, res, next) => {
    try {
        const rentals = await Rental
            .find()
            .sort({ dateOut: -1 });

        return res
            .status(200)
            .json(rentals);
    } catch (err) {
        return next(err);
    }
};

const rentalRouter = Router();

rentalRouter
    .route("/")
    .post(auth, validate(createRentalSchema), createRental)
    .get(getRentals);

module.exports = rentalRouter;