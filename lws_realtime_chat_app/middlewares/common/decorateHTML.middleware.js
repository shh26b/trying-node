"use strict";
const { APP_TITLE } = require("../../utils/config.util");


const decorateHTML = (title) => (req, res, next) => {
    res.locals.title = `${title} - ${APP_TITLE}`;
    res.locals.html = true;
    res.locals.loggedInUser = {};
    res.locals.errors = {};
    res.locals.data = {};
    next();
};


module.exports = decorateHTML;