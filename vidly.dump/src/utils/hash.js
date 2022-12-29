const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    return await bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    const isValidPassword = await bcrypt.compare(password, hash);
    return isValidPassword;
};

module.exports = { hashPassword, comparePassword };