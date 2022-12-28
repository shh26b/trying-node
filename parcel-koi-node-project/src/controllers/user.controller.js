const { Router } = require("express");
const { handleValidations } = require("../middlewares");
const { validateRequestUserData } = require("./../models/user.model");
const {
    deleteUser,
    getAllUsers,
    saveUser,
    updateUser,
    getUserById,
} = require("../services/user.service");

const getHandler = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers();
        return res.status(200).send(allUsers);
    } catch (err) {
        return next(err);
    }
};

const getByIdHandler = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await getUserById(id);
        return res.status(200).send(user);
    } catch (err) {
        return next(err);
    }
};

const postHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const savedUserId = await saveUser(body);
        return res.status(201).send(savedUserId);
    } catch (err) {
        return next(err);
    }
};

const putHandler = async (req, res, next) => {
    try {
        const body = req.body;
        const updatedUserId = await updateUser(body);
        return res.status(200).send(updatedUserId);
    } catch (err) {
        return next(err);
    }
};

const deleteHandler = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteUser(id);
        return res.status(200).send("User deleted successfully");
    } catch (err) {
        return next(err);
    }
};

const router = Router();

router
    .route("/")
    .get(getHandler)
    .post(handleValidations(validateRequestUserData), postHandler)
    .put(putHandler);

router.route("/:id").get(getByIdHandler).delete(deleteHandler);

const userRouter = Router();
userRouter.use("/users", router);

module.exports = userRouter;
