const { model, Schema } = require("mongoose");
const joi = require("joi");

const joiSchema = joi.object().keys({
    username: joi.string().alphanum().min(3).max(30).required(),
});

const validateRequestUserData = (data) => {
    const result = joiSchema.validate(data);
    data.createdAt = new Date();
    result.value = data;
    return result;
};

const UserDataModel = model(
    "User",
    Schema({
        username: { type: String, unique: true, required: true },
        createdAt: { type: Date, required: true },
    })
);

class UserViewModel {
    constructor(user) {
        this.id = user._id;
        this.username = user.username;
        this.createdAt = user.createdAt;
    }
}

module.exports = {
    validateRequestUserData,
    UserDataModel,
    UserViewModel,
};
