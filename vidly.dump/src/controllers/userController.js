const { Router } = require("express");
const _ = require("lodash");
const asyncWrapper = require("../middlewares/asyncWrapper");
const auth = require("../middlewares/auth");
const validate = require("../middlewares/validate");
const { comparePassword, hashPassword } = require("../utils/hash");
const { User } = require("../models/userModel");
const { createUserSchema, loginUserSchema } = require("../models/userModel");

const createUser = asyncWrapper(async (req, res, next) => {
    const payload = req.body;

    let user = await User.findOne({ email: payload.email });
    if (user) return res.status(400).send({ message: "User already exist" });

    payload.password = await hashPassword(payload.password);

    user = new User(_.pick(payload, "name", "email", "password"));
    await user.save();

    const token = await user.generateToken2();
    res.set("x-auth-token", token)
    return res.status(201).send(user);
});

const loginUser = asyncWrapper(async (req, res, next) => {
    const payload = req.body;
    const user = await User.findOne({ email: payload.email });
    if (!user) return res.status(404).send("User not found by the email");

    const isValidPassword = await comparePassword(payload.password, user.password);
    if (!isValidPassword) return res.status(401).send("Password not matching");

    const token = await user.generateToken2();
    return res.status(201).send({ access_token: token });
});

const getMe = asyncWrapper(async (req, res, next) => {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");
    return res.status(200).send(user);
});

const userRouter = Router();

userRouter.post("/register", validate(createUserSchema), createUser);
userRouter.post("/login", validate(loginUserSchema), loginUser);
userRouter.get("/me", auth, getMe)

module.exports = userRouter;