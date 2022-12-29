const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const auth = require("./middlewares/auth");
const logger = require("./middlewares/logger");
const config = require("config");
const startDebugger = require("debug")("app:start");
const dbDebugger = require("debug")("db");
const courses = require("./routes/courses");
const home = require("./routes/home");

const app = express();

app.set("view engine", "pug")
app.set("views", "./views") // default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"))
app.use(helmet())

console.log(process.env.NODE_ENV);
console.log(app.get("env"));

// Configuration
console.log("Application name:", config.get("name"));
console.log("Application name:", config.get("mail.host"));

if (app.get("env") === "development") {
    app.use(morgan("tiny"));
    console.log("Morgan enable...");
}

app.use(logger)
app.use(auth)

app.use("/api/courses", courses);
app.use("/", home);

// db work...
dbDebugger("Connected to db successfully");

const port = process.env.PORT || 3000;
app.listen(port, () => startDebugger(`Listening on port ${port}...`));
