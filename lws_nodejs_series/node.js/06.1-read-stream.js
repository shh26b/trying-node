const fs = require("fs");

const our_read_stream = fs.createReadStream(`${__dirname}/data.txt`);

our_read_stream.on("data", (chunk) => {
    console.log(chunk.toString());
});

console.log("hello");
