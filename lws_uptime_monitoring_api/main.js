/*
 * IN THE NAME OF ALLAH
 * Title: Project initial file
 * Description: Initial file to start the node server and workers
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

// dependencies
const server = require("./helpers/server");
const worker = require("./helpers/worker");

// app object - module scaffolding
const app = {};

app.init = () => {
    // start the server
    server.init();
    // start the worker
    worker.init();
};

app.init();
