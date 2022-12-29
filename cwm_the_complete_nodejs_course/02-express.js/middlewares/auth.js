const auth = (req, res, next) => {
    console.log("Authenticating...");
    return next();
}

module.exports = auth;
