const fs = require("fs");

const files = fs.readdirSync("./");
console.log(files);

fs.readdir("./../", (err, files) => {
    if (!err) console.log(files);
    else console.log(err);
});
console.log("After readdir");

fs.rename("README.md", "readme.md", (err) => {
    if (err) console.log(err);
});

try {
    fs.renameSync("readme.md", "README.md");
    // done
} catch (err) {
    console.log(err);
}
