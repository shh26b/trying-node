"use strict";
const { getUsers, addUser, deleteUser } = require("../controllers/users.controller");
const authGuard = require("../middlewares/common/auth.middleware");
const decorateHTML = require("../middlewares/common/decorateHTML.middleware");
const requireRole = require("../middlewares/login/requireRole.middleware");
const avatarUpload = require("../middlewares/users/avatarUpload.middleware");
const { addUserValidators, addUserValidationHandler } = require("../middlewares/users/userValidator.middleware");
const usersRouter = require("express").Router();


usersRouter.route("/")
    .get(
        decorateHTML("Users"),
        authGuard,
        requireRole(["admin"]),
        getUsers
    )
    .post(
        authGuard,
        requireRole(["admin"]),
        avatarUpload,
        addUserValidators,
        addUserValidationHandler,
        addUser
    );

usersRouter.route("/:id")
    .delete(
        requireRole(["admin"]),
        deleteUser
    );


module.exports = usersRouter

