const http = require("http");

const server = http.createServer(async (req, res) => {
    if (req.url === "/") {
        res.write("Hello World");
        res.end();
    }
    if (req.url === "/courses") {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

// server.on("connection", (socket) => {
//     console.log("New connections... ");
//     socket.write("Hello World");
//     socket
// });

server.listen(3000);

console.log("Listening on port 3000");
