const Joi = require("joi");
const mongoose = require("mongoose");

const customerCreateSchema = Joi.object({
    name: Joi.string().max(50).min(5).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
});

const customerUpdateSchema = Joi.object({
    name: Joi.string().max(50).min(5).optional(),
    phone: Joi.string().optional(),
    isGold: Joi.boolean().optional(),
}).or("name", "phone", "isGold").required();

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
        minlength: 5,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        minlength: 8,
        maxlength: 20,
    },
    isGold: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = { customerCreateSchema, customerUpdateSchema, Customer }