const http = require("http");
const fs = require("fs");

const port = 3000;

const server = http.createServer((req, res) => {
    const read_stream = fs.createReadStream(`${__dirname}/data.txt`, "utf8");
    read_stream.pipe(res);
});

server.on("connection", (socket) => {
    console.log(`${new Date().toString()}: from ${socket.localAddress}:${socket.localPort}`);
});

server.listen(port);
console.log(`listening on port http://localhost:${port}`);
