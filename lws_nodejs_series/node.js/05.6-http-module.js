const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write("Hello from Node");
        res.write(" In the name of Allash");
    } else if (req.url === "/about") {
        res.write("This is about");
    } else {
        res.write("404: Not Found");
    }
    res.end();
});

// server.on("connection", socket => {
//     console.log("New connection ...  from " + socket.remoteAddress);
// })

server.listen(port);
console.log(`listening on port http://localhost:${port}`);
