import express from "express";
import { errorHandler, notRoute } from "./middlewares/errors.js";
import courseRouter from "./routers/courseRouter.js";

const app = express();
app.use(express.json());

app.use("/api/courses", courseRouter)

app.use(notRoute);
app.use(errorHandler);

export default app;
