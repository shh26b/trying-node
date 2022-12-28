const { UserDataModel } = require("./../../models/user.model");
const { NotFoundError } = require("./../../utils/errors.util");

const users = [
    {
        id: "1",
        username: "shihab4t",
        createdAt: "2022-05-05T22:14:03.242Z",
    },
];

const getAllUsers = async () => {
    return users;
};

const saveUser = async (user) => {
    const model = new UserDataModel(user);
    users.push(model);
    return model._id;
};

const getUserById = async (id) => {
    const user = users.find((x) => x.id === id);
    if (!user) throw new NotFoundError("User not found by the id: " + id);
    return user;
};

const updateUser = async (user) => {
    users[0].username = user.username;
    return users[0].id;
};

const deleteUser = async (id) => {
    users[0] = {};
};

module.exports = {
    getAllUsers,
    saveUser,
    getUserById,
    updateUser,
    deleteUser,
};
