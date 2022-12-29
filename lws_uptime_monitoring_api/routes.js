/*
 * IN THE NAME OF ALLAH
 * Title: Routers patterns
 * Description: Set which function will call on the in individual route
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const { tokens_router } = require("./routers/tokens");
const { user_router } = require("./routers/users");
const { checks_router } = require("./routers/checks");

const routes = {
    "/users": user_router,
    "/tokens": tokens_router,
    "/checks": checks_router,
};

module.exports = routes;
