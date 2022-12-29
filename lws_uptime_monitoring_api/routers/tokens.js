/*
 * IN THE NAME OF ALLAH
 * Title: Tokens router
 * Description: Router for handling tokens routes
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/20/2022
 */

const data = require("../helpers/data");
const utilities = require("../helpers/utilities");
const { token_expire_time_minutes } = require("../helpers/environments");

const routers = {};
routers._tokens = {};

routers._tokens.get = (request_properties, callback) => {
    const token_id = utilities.validated_token_id(request_properties.query_string_object.id);
    if (token_id) {
        // Look up the token
        data.read("tokens", token_id, (err, p_token_data) => {
            if (!err) {
                const token_data = { ...p_token_data };
                callback(200, { token_data });
            } else callback(404, { error: "requested token was not found" });
        });
    } else callback(404, { error: "Requested token was not found !!" });
};

routers._tokens.post = (request_properties, callback) => {
    const phone = utilities.validated_user_phone(request_properties.body.phone);
    const password = utilities.validated_user_password(request_properties.body.password);
    if (phone && password) {
        data.read("users", phone, (err, user_data) => {
            if (!err) {
                const hashed_password = utilities.hash(password);
                if (hashed_password === user_data.password) {
                    const token_id = utilities.create_random_string(20);
                    const expire = Date.now() + token_expire_time_minutes * 60 * 1000;
                    const token_object = {
                        phone,
                        id: token_id,
                        expire,
                    };
                    // Store the token
                    data.create("tokens", token_id, token_object, (err2) => {
                        if (!err2) callback(200, token_object);
                        else callback(500, { error: "There was a problem in server side" });
                    });
                } else callback(400, { error: "Not match" });
            } else callback(500, { error: "Internal server error" });
        });
    } else callback(400, { error: "Not valid" });
};

routers._tokens.put = (request_properties, callback) => {
    const id = utilities.validated_token_id(request_properties.body.id);
    const extend = utilities.validated_extend(request_properties.body.extend);
    if (id && extend) {
        data.read("tokens", id, (err, p_token_data) => {
            if (!err) {
                const token_data = { ...p_token_data };
                if (token_data.expire >= Date.now()) {
                    token_data.expire = Date.now() + token_expire_time_minutes * 60 * 1000;
                    data.update("tokens", id, token_data, (err2) => {
                        if (!err2) {
                            callback(200, { massage: "Alright" });
                        } else callback(500, { error: "Internal server error" });
                    });
                } else callback(400, { error: "Token already expired" });
            } else callback(404, { error: "Not found" });
        });
        // callback(200);
    } else callback(400, { error: "Not valid" });
};

routers._tokens.delete = (request_properties, callback) => {
    const token_id = utilities.validated_token_id(request_properties.query_string_object.id);
    if (token_id) {
        data.delete("tokens", token_id, (err) => {
            if (!err) {
                callback(204, { massage: "Deletion successful" });
            } else callback(404, { error: "requested token was not found" });
        });
    } else callback(404, { error: "Requested token was not found !!" });
};

routers.token_verify = (token_id, phone, callback) => {
    data.read("tokens", token_id, (err, token) => {
        if (!err && token) {
            if (token.phone === phone && token.expire > Date.now()) {
                callback(true);
            } else callback(false);
        } else callback(false);
    });
};

routers.tokens_router = (request_properties, callback) => {
    const methods = {
        get: true,
        post: true,
        put: true,
        delete: true,
    };

    if (methods[request_properties.method]) {
        routers._tokens[request_properties.method](request_properties, callback);
    } else callback(405, { message: "Method Not Allowed" });
};

module.exports = routers;
