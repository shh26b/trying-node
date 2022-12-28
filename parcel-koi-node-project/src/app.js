const express = require("express");
const { processRequest } = require("./middlewares");
const { infoLogger } = require("./utils/logger.util");
const { handleErrors } = require("./middlewares");
const { errorLogger } = require("./utils/logger.util");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const userRouter = require("./controllers/user.controller");
const { ENV } = require("./utils/config.util");

const app = express();

app.use(express.json());
app.use(processRequest);

if (ENV !== "test") app.use(infoLogger());

app.use("/api", userRouter);

if (ENV !== "test") app.use(errorLogger());

app.use(handleErrors);
app.use("/api", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

module.exports = app;
