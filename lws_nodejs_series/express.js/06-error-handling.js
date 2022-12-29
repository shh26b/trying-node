const express = require("express");
const fs = require("fs");

const app = express();

app.get("/", (req, res) => {
    for (let i = 0; i <= 10; i++) {
        if (i === 5) {
            next("There was an error!");
        }
        res.write("a");
    }
    res.end();
})

app.get("/file", (req, res, next) => {
    fs.readFile("file-doesnt-exits", (err, data) => {
        if (err) {
            next(err);
        }
        else {
            res.send(data);
        }
    })
})

app.get("/file2", (req, res, next) => {
    fs.readFile("file-doesnt-exits", (err, data) => {
        console.log(data);
        next(err);
        console.log(data.property);
    })
})

app.get("/file3", [
    (req, res, next) => {
        fs.readFile("file-doesnt-exits", (err, data) => {
            console.log(data);
            next(err);
        })
    },
    (req, res, next) => {
        console.log(data.property);
    }
])

app.get("/set", (req, res, next) => {
    setTimeout(() => {
        try {
            console.log(a);
        } catch (err) {
            next(err);
        }
    }, 100);
})


app.use((req, res, next) => {
    res.sendStatus(404);
})

// app.use((err, req, res, next) => {
//     // handle error here
//     if (res.headersSent) {
//         next("There was a problem1");
//     } else {
//         console.log(err);
//         res.status(500).send(err.message);
//     }
// })

// invisible default error handling middleware

app.listen(3000, () => console.log(
    "Listaning on http://127.0.0.1:3000"
));
