const { compareToken } = require("../utils/jwt");

const auth = async (req, res, next) => {
    const token = req.headers["x-auth-token"];
    if (!token) return res.status(401)
        .send({ message: "Access denied. No token found" });
    try {
        const decoded = await compareToken(token);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(400).send({ message: "Invalid token." });
    }
};

module.exports = auth;