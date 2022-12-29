const fs = require("fs");

const our_read_stream = fs.createReadStream(`${__dirname}/data.txt`);
const our_write_stream = fs.createWriteStream(`${__dirname}/new-data2.txt`);

our_read_stream.pipe(our_write_stream);
