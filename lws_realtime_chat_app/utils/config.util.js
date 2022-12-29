"use strict";
require("dotenv").config()


const NODE_ENV = process.env.NODE_ENV;
const PORT = process.env.PORT;
const MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const APP_TITLE = process.env.APP_TITLE;
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY
const JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN)
const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME
const APP_URL = process.env.APP_URL


module.exports = {
    NODE_ENV,
    PORT,
    MONGODB_CONNECTION_STRING,
    COOKIE_SECRET,
    APP_TITLE,
    SALT_ROUNDS,
    JWT_SECRET_KEY,
    JWT_EXPIRES_IN,
    JWT_COOKIE_NAME,
    APP_URL
}