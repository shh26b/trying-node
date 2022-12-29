/* eslint-disable prettier/prettier */
/* eslint-disable max-len */
/*
 * IN THE NAME OF ALLAH
 * Title: Checks router
 * Description: Router for handling Checks related routes
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/21/2022
 */

const validators = require("../helpers/validators");
const utilities = require("../helpers/utilities");
const data = require("../helpers/data");
const tokens = require("./tokens");
const env = require("../helpers/environments");

const routers = {};
routers._checks = {};

routers._checks.get = (request_properties, callback) => {
    const check_id = validators.validated_check_id(request_properties.query_string_object.check_id);
    if (check_id) {
        // lookup the check
        data.read("checks", check_id, (err, check_data) => {
            if (!err && check_data) {
                const token = utilities.validated_token_id(request_properties.headers_object.token);
                tokens.token_verify(token, check_data.user_phone, (is_token_valid) => {
                    if (is_token_valid) {
                        callback(200, check_data);
                    } else callback(403, { error: "Auth failure" });
                });
            } else callback(500, { error: "Internal server error" });
        });
    } else callback(400, { error: "You have problem in your request" });
};

routers._checks.post = (request_properties, callback) => {
    // console.log(request_properties.body);
    const check_data = validators.validated_checks(request_properties.body);
    // console.log(check_data);

    if (
        check_data.protocol &&
        check_data.url &&
        check_data.method &&
        check_data.success_code &&
        check_data.time_out_seconds
    ) {
        const token = utilities.validated_token_id(request_properties.headers_object.token);
        // took up the user phone by token
        data.read("tokens", token, (err, token_data) => {
            if (!err && token_data) {
                const { phone } = token_data;
                data.read("users", phone, (err2, user_data) => {
                    if (!err2 && user_data) {
                        tokens.token_verify(token, user_data.phone, (is_token_valid) => {
                            if (is_token_valid) {
                                const user_checks =
                                    user_data.checks instanceof Array ? user_data.checks : [];
                                if (user_checks.length < env.checks_limit) {
                                    const new_check = {
                                        id: utilities.create_random_string(20),
                                        user_phone: phone,
                                        protocol: check_data.protocol,
                                        url: check_data.url,
                                        method: check_data.method,
                                        time_out_seconds: check_data.time_out_seconds,
                                        success_code: check_data.success_code,
                                    };
                                    data.create("checks", new_check.id, new_check, (err3) => {
                                        if (!err3) {
                                            // add check id to the users object
                                            // eslint-disable-next-line no-param-reassign
                                            user_data.checks = user_checks;
                                            user_data.checks.push(new_check.id);

                                            // save the new user data
                                            data.update("users", phone, user_data, (err4) => {
                                                if (!err4) {
                                                    // console.log("Done");
                                                    // console.log(user_data);
                                                    callback(200, new_check);
                                                } else callback(500, "Internal server error 2");
                                            });
                                        } else callback(500, "Internal server error");
                                    });
                                } else {
                                    callback(401, {
                                        error: "User has already reached max checks limit",
                                    });
                                }
                            } else callback(403, { error: "not valid token" });
                        });
                    } else callback(403, { error: "User not found" });
                });
            } else callback(403, { error: "Auth failure" });
        });
    } else callback(400, { error: "You have problem in your request" });
};

routers._checks.put = (request_properties, callback) => {
    const check_id = validators.validated_check_id(request_properties.body.id);
    const body_data = validators.validated_checks(request_properties.body);
    if (check_id) {
        if (
            body_data.protocol ||
            body_data.url ||
            body_data.method ||
            body_data.success_code ||
            body_data.time_out_seconds
        ) {
            data.read("checks", check_id, (err, p_check_data) => {
                const check_data = { ...p_check_data };
                if (!err && check_data) {
                    // is the token in valid or not
                    // eslint-disable-next-line prettier/prettier
                    const token = utilities.validated_token_id(request_properties.headers_object.token);
                    tokens.token_verify(token, check_data.user_phone, (is_token_valid) => {
                        if (is_token_valid) {
                            // console.log(user_data.phone, check_data.user_phone);
                            // update the checks finally
                            if (body_data.protocol) check_data.protocol = body_data.protocol;
                            if (body_data.url) check_data.url = body_data.url;
                            if (body_data.method) check_data.method = body_data.method;
                            if (body_data.success_code) {
                                check_data.success_code = body_data.success_code;
                            }
                            if (body_data.time_out_seconds) {
                                check_data.time_out_seconds = body_data.time_out_seconds;
                            }
                            data.update("checks", check_data.id, check_data, (err2) => {
                                if (!err2) {
                                    callback(200, { massage: "Successfully updated" });
                                } else callback(500, "Internal server side error 2");
                            });
                        } else callback(403, { error: "Auth failure" });
                    });
                } else callback(500, { error: "Internal server side error" });
            });
        } else callback(400, { error: "You must provide one field to update" });
    } else callback(400, { error: "You have problem in your request" });
};

routers._checks.delete = (request_properties, callback) => {
    const check_id = validators.validated_check_id(request_properties.query_string_object.check_id);
    if (check_id) {
        data.read("checks", check_id, (err, check_data) => {
            if (!err && check_data) {
                const token = utilities.validated_token_id(request_properties.headers_object.token);
                tokens.token_verify(token, check_data.user_phone, (is_token_valid) => {
                    if (is_token_valid) {
                        data.delete("checks", check_id, (err2) => {
                            if (!err2) {
                                data.read("users", check_data.user_phone, (err3, p_user_data) => {
                                    const user_data = { ...p_user_data };
                                    if (!err3 && user_data) {
                                        const user_checks =
                                            user_data.checks instanceof Array
                                                ? user_data.checks
                                                : [];
                                        // remove the delete check id from user's list of checks
                                        const check_position = user_checks.indexOf(check_id);
                                        if (check_position > -1) {
                                            user_checks.splice(check_position, 1);
                                            // re save the user data
                                            user_data.checks = user_checks;
                                            // eslint-disable-next-line prettier/prettier
                                            data.update("users", user_data.phone, user_data, (err4) => {
                                                if (!err4) {
                                                    // eslint-disable-next-line prettier/prettier
                                                    callback(202, { massage: "Deletion successful" });
                                                } else callback(500, { error: "Internal server error 3" });
                                            });
                                        } else {
                                            callback(500, { error: "the check id that you are trying to remove it not found int user!" });
                                        }
                                    } else callback(500, { error: "Internal server error 2" });
                                });
                            } else callback(500, { error: "Internal server error" });
                        });
                    } else callback(403, { error: "Auth failure" });
                });
            } else callback(500, { error: "Internal server error" });
        });
    } else callback(404, { error: "checks not found" });
};

routers.checks_router = (request_properties, callback) => {
    const methods = {
        get: true,
        post: true,
        put: true,
        delete: true,
    };

    if (methods[request_properties.method]) {
        routers._checks[request_properties.method](request_properties, callback);
    } else callback(405, { message: "Method Not Allowed" });
};

module.exports = routers;
