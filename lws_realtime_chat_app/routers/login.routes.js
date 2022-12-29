"use strict";
const { getLogin, login, logout, redirectLoggedIn } = require("../controllers/login.controller");
const decorateHTML = require("../middlewares/common/decorateHTML.middleware");
const { doLoginValidators, doLoginValidationHandler } = require("../middlewares/login/loginValidator.middleware");
const loginRouter = require("express").Router();


loginRouter.route("/")
    .all(
        decorateHTML("Login")
    )
    .get(
        redirectLoggedIn,
        getLogin
    )
    .post(
        doLoginValidators,
        doLoginValidationHandler,
        login
    )
    .delete(
        logout
    )


module.exports = loginRouter