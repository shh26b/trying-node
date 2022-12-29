// _id: 62b47c058a74156ec6405dc7 <- 24 character

/* 
12 bytes:
    - first 4 bytes: timestamp
    - second 3 bytes: machine identifier
    - middle 2 bytes: process identifier
    - last 3 bytes: counter

// 1 byte = 8 bits
// 2 ^ 8 = 256
// 2 ^ 24 = 16M

// MongoDB Driver generate this objectId
*/

const mongoose = require("mongoose");

const id = new mongoose.Types.ObjectId();

console.log(id);
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid("1234"));
console.log(mongoose.Types.ObjectId.isValid(id));