"use strict";
const createError = require('http-errors');
const { NODE_ENV } = require('../../utils/config.util');

const err404 = (req, res, next) => {
    next(createError(404, "Your requested content not found"))
}

const err000 = (err, req, res, next) => {
    res.locals.error = NODE_ENV === "development"
        ? err
        : { error: err.message };
    res.locals.html = req.accepts('html');

    res.status(err.status || 500);

    if (res.locals.html) {
        res.render("error", { title: "Error page" });
    }
    else {
        res.json(res.locals.error);
    }
}

module.exports = { err404, err000 };