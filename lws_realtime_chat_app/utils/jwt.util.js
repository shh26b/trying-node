"use strict";
const jsonwebtoken = require("jsonwebtoken");
const { JWT_SECRET_KEY, JWT_EXPIRES_IN } = require("./config.util");


const generateToken = async payload => await jsonwebtoken.sign(
    payload, JWT_SECRET_KEY, { expiresIn: JWT_EXPIRES_IN }
)



const verifyToken = token => new Promise((resolve, reject) => {
    jsonwebtoken.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) reject(err);
        else resolve(decoded);
    });
});


module.exports = {
    generateToken,
    verifyToken
};