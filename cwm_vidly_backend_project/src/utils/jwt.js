const jsonwebtoken = require("jsonwebtoken");
const { JWT_EXPIRES_IN_MINUTE, JWT_SECRET_KEY } = require("./env");

const generateToken = (payload) =>
    new Promise((resolve, reject) => {
        jsonwebtoken.sign(
            payload,
            JWT_SECRET_KEY,
            { expiresIn: JWT_EXPIRES_IN_MINUTE * 60 },
            (err, token) => {
                if (err) return reject(err);
                return resolve(token);
            }
        );
    });

const compareToken = (token) =>
    new Promise((resolve, reject) => {
        jsonwebtoken.verify(token, JWT_SECRET_KEY, (err, decoded) => {
            if (err) return reject(err);
            return resolve(decoded);
        });
    });

module.exports = { generateToken, compareToken }
