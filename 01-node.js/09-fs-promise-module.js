// Example: Read a file and change its content and read
// it again using promise-based API.

const fs = require("fs/promises");

const main = async (fileName) => {
    let content = "Initial content";
    try {
        await fs.writeFile(fileName, content);
        console.log(`Created file ${fileName} with ${content}`);

        const data = await fs.readFile(fileName);
        console.log(String(data));
        content = "Some content";

        await fs.writeFile(fileName, content);
        console.log(`${fileName} file update with data ${content}`);

        const data2 = await fs.readFile(fileName);
        console.log(String(data2));

        await fs.unlink(fileName);
        console.log(`${fileName} File deleted successfully`);
    } catch (err) {
        console.log(err);
    }
};

main("tmp.txt");
