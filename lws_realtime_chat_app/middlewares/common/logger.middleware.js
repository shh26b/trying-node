"use strict";
const logger = (req, res, next) => {
    const msg = `${new Date().toISOString()}: ${req.method}`
        + ` ${req.originalUrl} ${req.protocol} ${req.hostname}`
    console.log(msg);
    next();
}


module.exports = logger;