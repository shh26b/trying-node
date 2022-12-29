const fs = require("fs");

fs.writeFileSync("file.txt", "hello programmer");
fs.appendFileSync("file.txt", " How are you?");
const data = fs.readFileSync("file.txt");

console.log(data.toString());

fs.readFile("file.txt", (err, dt) => {
    console.log(`${dt.toString()} again`);
});
