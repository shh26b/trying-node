const log = (req, res, next) => {
    console.log("Logging...");
    return next();
}

module.exports = log;
