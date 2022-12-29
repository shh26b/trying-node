const public = require("express").Router();

public.get("/", (req, res, next) => {
    console.log("This root in console");
    next();
});

public.get("/", (req, res) => {
    res.send("This root /")
})

public.all("*", (req, res, next) => {
    console.log(`In public: ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl}`);
    next();
})

public.get("/about", (req, res) => {
    res.send("This is about /about")
});

public.param("id", (req, res, next, id) => {
    req.id = id;
    next();
})

// public.param((param, option) => {
//     return (req, res, next, val) => {
//         console.log(val);
//         if (val === option) {
//             next();
//         }
//         else {
//             res.sendStatus(403);
//         }
//     }
// })

// public.param("id", 12);

public.get("/users/:id", (req, res) => {
    console.log("hello");
    res.send("This user/:id");
})

module.exports = public;