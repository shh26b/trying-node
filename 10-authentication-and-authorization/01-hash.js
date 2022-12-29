const bcrypt = require("bcrypt");

const run = async () => {
    const salt = await bcrypt.genSalt(10);
    console.log(salt);
}

run();
