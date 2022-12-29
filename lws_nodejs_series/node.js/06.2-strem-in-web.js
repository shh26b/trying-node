const http = require("http");

const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.write(`
            <html>
            <head>
                <title>Form</title>
            </head>
            <body>
                <form method="post" action="/process">
                    <input name="message" />
                </form>
            </body>
            </html>
        `);
        res.end();
    } else if (req.url === "/process" && req.method === "POST") {
        const body = [];
        req.on("data", (chunk) => {
            body.push(chunk);
        });
        req.on("end", () => {
            const parsed_body = Buffer.concat(body).toString();
            console.log(parsed_body);
            res.write("Stream finished");
            res.write("Thanks you for submitting.");
            res.end();
        });
    } else {
        res.write("404: Not Found");
        res.end();
    }
});

server.on("connection", (socket) => {
    console.log(`${new Date().toString()}: from ${socket.localAddress}:${socket.localPort}`);
});

server.listen(port);
console.log(`listening on port http://localhost:${port}`);
