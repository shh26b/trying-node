const admin = require("express").Router();


admin.all("*", (req, res, next) => {
    console.log(`In admin: ${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl}`);
    next();
})

admin.get("/", (req, res) => {
    res.send("This is dashbard /admin/");
})

admin.get("/login", (req, res) => {
    res.send("This is admin login /admin/login")
})

module.exports = admin;
