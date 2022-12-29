const fs = require("fs");

const our_read_stream = fs.createReadStream(`${__dirname}/data.txt`);
const our_write_stream = fs.createWriteStream(`${__dirname}/new-data.txt`);

our_read_stream.on("data", (chunk) => {
    our_write_stream.write(chunk);
});

console.log("hello");
