const path = require("path");

// Properties
console.log(`current os path separator: ${path.sep}`);
console.log(`current os path delimiter: ${path.delimiter}`);

// Methods
const currentModulePathObj = path.parse(__filename);
console.log(currentModulePathObj);

const currentPathString = path.format(currentModulePathObj);
console.log(currentPathString);

console.log(path.format({ dir: "/Users/joe", base: "test.txt" }));
console.log(path.format({ root: "/Users/joe", name: "test", ext: ".txt" }));
console.log(path.format({ dir: "C:\\Users\\joe", base: "test.txt" }));

console.log(path.basename("/test/something"));
console.log(path.basename("/test/something.txt"));
console.log(path.basename("/test/something.txt", ".txt"));

console.log(path.dirname("/test/something"));
console.log(path.dirname("/test/something/file.txt"));

console.log(path.extname("/test/something"));
console.log(path.extname("/test/something/file.txt"));

console.log(path.isAbsolute("./test/something"));
console.log(path.isAbsolute("/test/something"));

const name = "shihab";
console.log(path.join("/", "users", name, "notes.txt"));

console.log(path.normalize("/users/joe/..//test.txt"));

console.log(
    path.relative(
        "/home/shihab4t",
        "/home/shihab4t/Competitive-Programming/conenv"
    )
);

console.log(path.resolve("Competitive-Programming/Books/C++"));
console.log(path.resolve("shihab4t", "Competitive-Programming/Books/C++"));
console.log(path.resolve("/shihab4t", "Competitive-Programming/Books/C++"));
