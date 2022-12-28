require("dotenv").config();

const ENV = process.env.ENV || "prod";
const DB_URI =
    process.env.DB_URI || "mongodb://localhost:27017/parcel-koi-dump";

module.exports = {
    ENV,
    DB_URI,
};
