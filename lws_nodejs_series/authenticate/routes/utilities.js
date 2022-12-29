const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

require('dotenv').config()


const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;


const err500 = (err, res) => {
    console.log(err);
    res.status(500);
    res.json({ error: "Internal Server Error" })
}


const encrypt = (text) => new Promise((resolve, reject) => {
    bcrypt.hash(text, SALT_ROUNDS, (err, hash) => {
        if (err) reject(err);
        else resolve(hash);
    });
});


const matched = (text, hash) => new Promise((resolve, reject) => {
    bcrypt.compare(text, hash, (err, res) => {
        if (err) reject(err);
        else resolve(res);
    })
})


const generateToken = (payload) => {
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    return token;
}


const verifyToken = (token) => {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
}


module.exports = {
    err500, encrypt, matched, generateToken,
    verifyToken
};
