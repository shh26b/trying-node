/*
 * IN THE NAME OF ALLAH
 * Title: Node sever file
 * Description: Responsible for creating node server.
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/25/2022
 */

// dependencies
const http = require("http");
const { req_res_handler } = require("./handler");
const env = require("./environments");

// server object - module scaffolding
const server = {};

// create server
server.init = () => {
    const server_obj = http.createServer(req_res_handler);
    server_obj.listen(env.port, () => {
        console.log(`on http://${env.url}:${env.port}`);
    });
};

module.exports = server;
