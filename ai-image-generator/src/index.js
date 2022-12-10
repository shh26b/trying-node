import express, { json, urlencoded } from "express";
import morgan from "morgan";
import { PORT } from "./env.js";
import openaiRouter from "./openai/router.js";

const app = express();

app.use(morgan("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use("/openai", openaiRouter);

app.listen(PORT, () => console.log(`Listening on: ${PORT}`));
