const winston = require("winston");
// require(winston-mongodb);
const { runNotInProd } = require("./env");

const { createLogger, transports, format } = winston;
const { File, Console } = transports;
const { MongoDB } = transports;
const { MONGODB_URI } = require("./env");

const logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new File({ filename: "error.log", level: "error" }),
        // new MongoDB({ db: MONGODB_URI, level: "error" })
    ],
    exceptionHandlers: [
        new File({ filename: "exceptions.log" }),
        new Console({ format: format.simple() })
    ]
});

runNotInProd(() => { logger.add(new Console({ format: format.simple() })); });

const handleUncaughtException = (err) => {
    logger.error("Uncaught exception detected!", err);
    logger.on("finish", () => {
        process.exit(1);
    });
};

const handleUnhandledRejection = (err) => {
    throw err;
    // logger.error("Unhandled rejection detected!", err);
    // logger.on("finish", () => {
    //     process.exit(1);
    // });
};

module.exports = { logger, handleUncaughtException, handleUnhandledRejection };