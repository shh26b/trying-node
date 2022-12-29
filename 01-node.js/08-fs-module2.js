// Example: Read a file and change its content and read
// it again using callback-based API.

const fs = require("fs");

let fileName = "tmp.txt";
let content = "Initial content";
fs.writeFile(fileName, content, (err) => {
    if (err) return console.log(err);
    console.log(`Created file ${fileName} with ${content}`);

    // fileName = "something";
    fs.readFile(fileName, (err2, data) => {
        if (err2) return console.log(err2);
        console.log(String(data));
        content = "Some content";

        fs.writeFile(fileName, content, (err3) => {
            if (err3) return console.log(err3);
            console.log(`${fileName} file update with data ${content}`);

            fs.readFile(fileName, (err4, data2) => {
                if (err4) return console.log(err4);
                console.log(String(data2));

                fs.unlink(fileName, (err5) => {
                    if (err5) return console.log(err5);
                    console.log(`${fileName} File deleted successfully`);
                });
            });
        });
    });
});
