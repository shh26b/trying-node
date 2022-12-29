"use strict";
const User = require("../models/people.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/jwt.util");
const { JWT_COOKIE_NAME, JWT_EXPIRES_IN } = require("../utils/config.util");
const createError = require("http-errors");


const getLogin = (req, res, next) => {
    res.render("index")
}


const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [
                { email: req.body.username },
                { mobile: req.body.username }
            ],
        })

        if (user && user._id) {
            const isValidPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (isValidPassword) {
                const userObject = {
                    username: req.body.username,
                    name: user.name,
                    mobile: user.mobile,
                    email: user.email,
                    role: user.role || "user",
                    avatar: user.avatar
                }

                const token = await generateToken(userObject)

                res.cookie(JWT_COOKIE_NAME, token, {
                    maxAge: JWT_EXPIRES_IN,
                    httpOnly: true,
                    signed: true,
                })

                res.locals.loggedInUser = userObject;

                res.redirect("inbox");
            } else {
                throw createError("Login failed! Please try again!")
            }
        } {
            throw createError("Login failed! Please try again!")
        }
    } catch (err) {
        return res.render("index", {
            data: {
                username: req.body.username
            },
            errors: {
                common: {
                    msg: err.message,
                }
            }
        });
    }
}

const logout = (req, res, next) => {
    res.clearCookie(JWT_COOKIE_NAME)
    return res.send("logged out")
}

const redirectLoggedIn = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
    if (!cookies) {
        return next();
    } else {
        return res.redirect("/inbox")
    }
}

module.exports = {
    getLogin,
    login,
    logout,
    redirectLoggedIn
}