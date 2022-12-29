const mongoose = require("mongoose");
// const Fawn = require("fawn");
const { MONGODB_URI, runNotInTest } = require("./env");
const { logger } = require("./logger");

const mongo = () => {
    try {
        const successfulMessage = `Connection with mongodb successful!`
            + ` with ${MONGODB_URI}`;
        mongoose.connect(MONGODB_URI);
        runNotInTest(() => { logger.info(successfulMessage); });
        // Fawn.init(MONGODB_URI);
    }
    catch (err) {
        const failureMessage = `Mongodb connection failure!! with`
            + ` ${MONGODB_URI} \n error: ${err}`;
        runNotInTest(() => { logger.error(failureMessage); });
        process.exit(1);
    }
};

module.exports = mongo;