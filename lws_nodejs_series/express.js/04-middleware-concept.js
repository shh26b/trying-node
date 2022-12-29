const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
app.listen(3000, () => console.log("on :3000"));


app.use(cookieParser());
app.use(express.json());

// const myMiddleware = (req, res, next) => {
//     console.log("I am logging");
//     next();
// }

// const myMiddleware2 = (req, res, next) => {
//     console.log("I am logging2");
//     next();
// }

// app.use(myMiddleware);
// app.use(myMiddleware2);

const errorMid = (err, req, res, next) => {
    console.log(err.message);
    res.sendStatus(500);
}



const logger = (req, res, next) => {
    console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
    next();
    // throw new Error("This is an error");
}

const loggerWrapper = (options) =>
    (req, res, next) => {
        if (options.log) {
            console.log(`${new Date(Date.now()).toLocaleString()} - ${req.method} - ${req.originalUrl} - ${req.protocol} - ${req.ip}`);
            next();
        }
        else {
            throw new Error("Failed to log");
        }
    };

// app.use(logger);

app.get("/about", (req, res) => {
    res.send("About");
})


const adminRouter = express.Router();

adminRouter.use(loggerWrapper({ log: true }));
adminRouter.use(errorMid);

adminRouter.get("/dashboard", (req, res) => {
    res.send("Dashboard");
})

app.use("/admin", adminRouter);




