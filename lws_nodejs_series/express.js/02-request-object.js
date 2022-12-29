const express = require("express");
const cookiesParser = require("cookie-parser");
const userPost = require("./user-post");

const app = express();
app.listen(3000, () => console.log("On http://127.0.0.1:3000"));


const adminRouter = express.Router();

app.use("/admin", adminRouter);

adminRouter.get("/dashboard", (req, res) => {
    console.log(req.baseUrl);
    console.log(req.originalUrl);
    console.log(req.url);
    console.log(req.path);
    console.log(req.hostname);
    console.log(req.ip);
    console.log(req.method);
    console.log(req.protocol);
    res.send("In admin dashboard");
})


app.get("/users/:id", (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    console.log(req.query);
    res.send("in user");
})


app.use(express.json());
app.use(cookiesParser());

app.set("coder", "Shihab");
app.post("/users", userPost);

app.get("/", (req, res) => {
    res.send("This is root get");
});
