const Joi = require("joi");
const joiObjectid = require("joi-objectid");
Joi.objectId = joiObjectid(Joi);

const returnRentalSchema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
});

module.exports = { returnRentalSchema };