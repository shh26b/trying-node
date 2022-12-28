const expressWinston = require("express-winston");
const winstonMongo = require("winston-mongodb");
const { DB_URI } = require("./config.util");
const { transports, format } = require("winston");

const getMessage = (req, res) => {
    const obj = {
        correlationId: req.headers["x-correlation-id"],
        requestBody: req.body,
    };
    return JSON.stringify(obj);
};

const infoLogger = () =>
    expressWinston.logger({
        transports: [new transports.Console()],
        format: format.combine(format.colorize(), format.json()),
        meta: false,
        msg: getMessage,
    });

const errorLogger = () =>
    expressWinston.errorLogger({
        transports: [
            new transports.Console(),
            new transports.MongoDB({
                db: DB_URI,
                metaKey: "meta",
                collection: "logs",
            }),
        ],
        format: format.combine(format.colorize(), format.json()),
        meta: true,
        msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
    });

module.exports = {
    infoLogger,
    errorLogger,
};
