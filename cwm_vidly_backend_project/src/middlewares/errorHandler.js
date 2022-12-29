const { logger } = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    logger.error(err);
    return res.status(500).send(err.message + "hello");
};

module.exports = errorHandler;
