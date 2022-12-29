const auth = require("../middlewares/auth");
const { Rental } = require("../models/rentalModel");
const returnRouter = require("express").Router();
const validate = require("../middlewares/validate");
const { returnRentalSchema } = require("../models/returnModel")

returnRouter.post("/", [auth, validate(returnRentalSchema)], async (req, res) => {
    const { customerId, movieId } = req.body;
    let rental = await Rental.lookup(customerId, movieId);

    if (!rental)
        return res.status(404).send({ message: "rental not found" });

    if (rental.dateReturned)
        return res.status(400).send({ message: "rental already processed" });

    rental = await rental.return();

    return res.status(200).send(rental);
});

module.exports = returnRouter;
