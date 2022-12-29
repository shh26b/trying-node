// external imports
const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const moment = require("moment");

const { err404, err000 } = require("./middlewares/common/err.middleware");
const loginRouter = require("./routers/login.routes");
const usersRouter = require("./routers/users.routes");
const inboxRouter = require("./routers/inbox.routes");
const { COOKIE_SECRET, MONGODB_CONNECTION_STRING, PORT, APP_URL } = require("./utils/config.util");

const app = express();
const server = http.createServer(app);
dotenv.config();

// socket creation
const io = require("socket.io")(server);
global.io = io;

// set comment as app locals
app.locals.moment = moment;

// database connection
mongoose
    .connect(MONGODB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("database connection successful!"))
    .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found handler
app.use(err404);

// common error handler
app.use(err000);

server.listen(PORT, () => {
    console.log(`app listening on ${APP_URL}`);
});
