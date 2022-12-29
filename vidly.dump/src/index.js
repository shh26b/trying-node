const app = require("./app");
const { APP_PORT, NODE_ENV, runNotInTest } = require("./utils/env");
const { logger } = require("./utils/logger");

app.listen(APP_PORT, () => {
    const message = `Listening on port http://localhost:${APP_PORT}`;
    runNotInTest(() => { logger.info(message) });;
});
