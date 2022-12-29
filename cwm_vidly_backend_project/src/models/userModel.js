const Joi = require("joi");
const mongoose = require("mongoose");
const passwordComplexity = require("joi-password-complexity");
const { generateToken } = require("../utils/jwt")

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 3, maxlength: 255 },
    email: { type: String, unique: true, required: true, minlength: 3, maxlength: 255 },
    password: { type: String, required: true, minlength: 6, maxlength: 1024 },
    isAdmin: { type: Boolean, default: false }
})

userSchema.methods.generateToken2 = async function () {
    const jwtPayload = {
        _id: this._id,
        name: this.name,
        email: this.email,
        isAdmin: this.isAdmin
    };
    const token = await generateToken(jwtPayload);
    return token;
};

const User = mongoose.model("User", userSchema);


const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 2,
};

const createUserSchema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(3).max(255).required(),
    password: passwordComplexity(complexityOptions)
});

const loginUserSchema = Joi.object({
    email: Joi.string().min(3).max(255).required(),
    password: passwordComplexity(complexityOptions)
});

const userResponse = user => ({
    _id: user._id,
    name: user.name,
    email: user.email
});

module.exports = { User, createUserSchema, loginUserSchema, userResponse };
