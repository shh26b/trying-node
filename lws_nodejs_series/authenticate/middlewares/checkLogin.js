const { verifyToken } = require("../routes/utilities");


const checkLogin = (req, res, next) => {
    const { authorization } = req.headers;
    try {
        const token = authorization.split(" ")[1];
        const { username, user_id } = verifyToken(token);
        req.username = username;
        req.user_id = user_id;
        next();
    } catch (err) {
        next("Authentication failure");
    }
}

module.exports = checkLogin;