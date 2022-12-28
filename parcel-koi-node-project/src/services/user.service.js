const { UserDataModel, UserViewModel } = require("./../models/user.model");
const { NotFoundError } = require("../utils/errors.util");

const getAllUsers = async () => {
    const users = await UserDataModel.find();
    return users.map((user2) => new UserViewModel(user2));
};

const getUserById = async (id) => {
    if (id.length != 24)
        throw new NotFoundError("User not found by the id: " + id);

    const user = await UserDataModel.findById(id);
    if (!user) throw new NotFoundError("User not found by the id: " + id);

    return new UserViewModel(user);
};

const saveUser = async (user) => {
    const model = new UserDataModel(user);
    const savedUser = await model.save();
    return savedUser._id;
};

const updateUser = async (user) => {
    const id = user._id;
    if (id.length != 24)
        throw new NotFoundError("User not found by the id: " + id);

    const model = await UserDataModel.findById(id);
    if (!model) throw new NotFoundError("User not found by the id: " + id);

    model.username = user.username;
    const updatedUser = await UserDataModel.findByIdAndUpdate(id, model, {
        new: true,
    });
    return updatedUser._id;
};

const deleteUser = async (id) => {
    if (id.length != 24)
        throw new NotFoundError("User not found by the id: " + id);

    const model = await UserDataModel.findById(id);
    if (!model) throw new NotFoundError("User not found by the id: " + id);

    return await UserDataModel.deleteOne({ _id: id });
};

module.exports = {
    getAllUsers,
    saveUser,
    updateUser,
    deleteUser,
    getUserById,
};
