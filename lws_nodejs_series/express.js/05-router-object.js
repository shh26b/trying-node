const express = require("express");
const publicRouter = require("./routers/public")
const adminRouter = require("./routers/admin")

const app = express();


app.use("/admin", adminRouter);
app.use("/", publicRouter);


app.listen(3000, () => console.log(
    "Listaning on http://127.0.0.1:3000"
));
