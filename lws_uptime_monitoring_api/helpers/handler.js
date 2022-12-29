/*
 * IN THE NAME OF ALLAH
 * Title: Request Response Handler
 * Description: Handler for handling Incoming request and give response
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { not_found_router } = require("../routers/not_found");
const { parse_json } = require("./utilities");

const handler = {};

handler.req_res_handler = (req, res) => {
    console.log(`${new Date().toString()}: new connection!`);
    const parsed_url = url.parse(req.url, true);
    const path = parsed_url.pathname;

    const trimmed_path = path.length >= 2 && path.slice(-1) === "/" ? path.slice(0, -1) : path;
    const method = req.method.toLowerCase();
    const query_string_object = parsed_url.query;
    const headers_object = req.headers;

    const request_properties = {
        parsed_url,
        path,
        trimmed_path,
        query_string_object,
        method,
        headers_object,
    };

    const chosen_router = routes[trimmed_path] ? routes[trimmed_path] : not_found_router;

    const decoder = new StringDecoder("utf-8");
    let real_data = "";
    req.on("data", (buffer) => {
        real_data += decoder.write(buffer);
    });
    req.on("end", () => {
        real_data += decoder.end();
        request_properties.body = parse_json(real_data);

        chosen_router(request_properties, (p_status_code, p_payload) => {
            const status_code = typeof p_status_code === "number" ? p_status_code : 500;
            const payload = JSON.stringify(typeof p_payload === "object" ? p_payload : {});

            // return final response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(status_code);
            res.end(payload);
        });
    });
};

module.exports = handler;
