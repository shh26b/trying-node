const _ = require("lodash");
const people = require("./people");

console.log(global);

const a = 4;
console.log(a);
console.log(global.a);

console.log(__dirname);
console.log(__filename);
console.log(people.people_r);

console.log(_.last(people.people));
