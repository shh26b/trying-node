const EventEmitter = require("events");

class Logger extends EventEmitter {
    log = (message) => {
        console.log(message);
        this.emit("logged");
    };
}

const logger = new Logger();

logger.on("logged", () => {
    console.log("Logged Done");
});

logger.log("Inside log function");
