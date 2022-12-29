/*
 * IN THE NAME OF ALLAH
 * Title: User router
 * Description: Router for handling users related routes
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const data = require("../helpers/data");
const utilities = require("../helpers/utilities");
const { token_verify } = require("./tokens");

const routers = {};
routers._users = {};

routers._users.get = (request_properties, callback) => {
    // check the phone is valid
    // path params: "/users?phone=017xxxxxxxx"
    const phone = utilities.validated_user_phone(request_properties.query_string_object.phone);
    if (phone) {
        // verify token
        const given_token = utilities.validated_token_id(request_properties.headers_object.token);
        token_verify(given_token, phone, (decision) => {
            if (decision) {
                // lookup the user
                data.read("users", phone, (err, p_user) => {
                    if (!err) {
                        const user = { ...p_user };
                        delete user.password;
                        callback(200, { user });
                    } else callback(404, { error: "requested user not found" });
                });
            } else callback(403, { error: "Auth is failure" });
        });
    } else callback(404, { error: "Requested user not found" });
};

routers._users.post = (request_properties, callback) => {
    const user_data = utilities.validated_user(request_properties.body);
    if (user_data.first_name && user_data.last_name && user_data.phone && user_data.password) {
        data.read("users", user_data.phone, (err) => {
            if (err) {
                const new_user = {
                    first_name: user_data.first_name,
                    last_name: user_data.last_name,
                    phone: user_data.phone,
                    password: utilities.hash(user_data.password),
                    tos_agreement: user_data.tos_agreement,
                };

                data.create("users", user_data.phone, new_user, (err2) => {
                    if (!err2) {
                        delete new_user.password;
                        callback(201, { massage: "Created", user: new_user });
                    } else callback(500, { massage: "Could not create user" });
                });
            } else callback(500, { massage: "There was a problem in server side" });
        });
    } else callback(400, { massage: "You have a problem in your requests" });
};

routers._users.put = (request_properties, callback) => {
    // get valid data
    const body = utilities.validated_user(request_properties.body);

    if (body.first_name || body.last_name || body.password) {
        // verify auth
        const given_token = utilities.validated_token_id(request_properties.headers_object.token);
        token_verify(given_token, body.phone, (decision) => {
            if (decision) {
                // lookup user
                data.read("users", body.phone, (err, p_user) => {
                    if (!err) {
                        const user = { ...p_user };
                        if (body.first_name) user.first_name = body.first_name;
                        if (body.last_name) user.last_name = body.last_name;
                        if (body.password) user.password = utilities.hash(body.password);
                        // console.log(user);
                        data.update("users", user.phone, user, (err2) => {
                            if (!err2) {
                                callback(200, { massage: "update successful" });
                            } else {
                                callback(500, { massage: "There was problem in the server side" });
                            }
                        });
                    } else callback(400, { massage: "You have problem in request!" });
                });
            } else callback(403, { error: "Auth is failure" });
        });
    } else callback(400, { massage: "You have problem in request!" });
};

routers._users.delete = (request_properties, callback) => {
    const phone = utilities.validated_user_phone(request_properties.query_string_object.phone);
    if (phone) {
        // verify auth
        const given_token = utilities.validated_token_id(request_properties.headers_object.token);
        token_verify(given_token, phone, (decision) => {
            if (decision) {
                // lookup user
                data.delete("users", phone, (err) => {
                    if (!err) {
                        callback(204, { massage: "successfully deleted" });
                    } else callback(500, { massage: "There was a problem in server" });
                });
            } else callback(403, { error: "Auth is failure" });
        });
    } else callback(400, { massage: "There was a problem in your request!" });
};

routers.user_router = (request_properties, callback) => {
    const methods = {
        get: true,
        post: true,
        put: true,
        delete: true,
    };

    if (methods[request_properties.method]) {
        routers._users[request_properties.method](request_properties, callback);
    } else callback(405, { message: "Method Not Allowed" });
};

module.exports = routers;
