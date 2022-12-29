"use strict"
const { JWT_COOKIE_NAME } = require("../../utils/config.util");
const { verifyToken } = require("../../utils/jwt.util");


const authGuard = async (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;

    if (cookies) {
        try {

            const token = cookies[JWT_COOKIE_NAME];
            const decoded = await verifyToken(token)
            req.user = decoded;

            // pass user info to response locals
            if (res.locals.html) {
                res.locals.loggedInUser = decoded;
            }

            return next();
        } catch (err) {
            if (res.locals.html) {
                return res.redirect("/")
            } else {
                res.status(500).json({
                    errors: {
                        common: {
                            msg: "Authentication failure!",
                        }
                    }
                })
            }
        }
    } else {
        if (res.locals.html) {
            return res.redirect("/")
        } else {
            res.status(401).json({
                errors: {
                    common: {
                        msg: "Authentication failure!",
                    }
                }
            })
        }
    }
}


module.exports = authGuard;