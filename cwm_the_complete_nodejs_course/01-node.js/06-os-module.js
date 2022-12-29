const os = require("os");

const totalMemory = os.totalmem();
const freeMemory = os.freemem();

console.log(`Total Memory ${totalMemory}`);
console.log(`Free Memory ${freeMemory}`);

// console.log(os.EOL);
// console.log(os.constants.signals);

console.log(`CPU Architecture ${os.arch()}`);
console.log(`CPU Details ${JSON.stringify(os.cpus())}`);

console.log(os.endianness());
console.log(os.homedir());
console.log(os.hostname());
console.log(os.loadavg());

console.log(os.networkInterfaces());

console.log(`Node compiled platform: ${os.platform()}`);
console.log(`OS release: ${os.release()}`);

console.log(os.tmpdir());
console.log(os.type());

console.log(os.uptime());

console.log(os.userInfo());
