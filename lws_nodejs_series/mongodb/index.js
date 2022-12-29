const express = require("express");
const mongoose = require("mongoose");

const todosRouter = require("./routes/todosRouter");


const app = express();
app.use(express.json());


// db connection with mongoose
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/todos", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connection with db successful")
    } catch (err) {
        console.log("Connection with db failure\n" + err)
    }
}
connectDB();

// app routes
app.use("/todos", todosRouter);


// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ error: err })
}

app.listen(3000, () => {
    console.log("Listening on 3000")
});