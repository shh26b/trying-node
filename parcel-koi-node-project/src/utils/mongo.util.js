const mongoose = require("mongoose");
const { DB_URI } = require("./config.util");

const options = {};

const connect_with_db = async () => {
    try {
        console.log(DB_URI);
        await mongoose.connect(DB_URI, options);
        console.log(`Connected to db successful`);
    } catch (err) {
        console.log(`Database connection failure: ${err}`);
    }
};

module.exports = {
    connect_with_db,
};
