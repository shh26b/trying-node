const createError = require("http-errors");

// guard to protect routes that need role based authorization
function requireRole(role) {
    return function (req, res, next) {
        if (req.user.role && role.includes(req.user.role)) {
            next();
        } else {
            if (res.locals.html) {
                next(createError(401, "You are not authorized to access this page!"));
            } else {
                res.status(401).json({
                    errors: {
                        common: {
                            msg: "You are not authorized!",
                        },
                    },
                });
            }
        }
    };
}

module.exports = requireRole;
