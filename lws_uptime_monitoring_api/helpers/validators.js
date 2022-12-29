/*
 * IN THE NAME OF ALLAH
 * Title: Checks Validator
 * Description: All checks validation function
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/21/2022
 */
const validators = {};

validators.validated_checks = (check_body) => {
    const re_check_body = {};
    re_check_body.protocol =
        typeof check_body.protocol === "string" &&
        ["http", "https"].indexOf(check_body.protocol) > -1
            ? check_body.protocol
            : false;
    re_check_body.url =
        typeof check_body.url === "string" && check_body.url.trim().length > 0
            ? check_body.url
            : false;
    re_check_body.method =
        typeof check_body.method === "string" &&
        ["get", "post", "put", "delete"].indexOf(check_body.method) > -1
            ? check_body.method
            : false;
    re_check_body.success_code =
        check_body.success_code instanceof Array ? check_body.success_code : false;
    re_check_body.time_out_seconds =
        typeof check_body.time_out_seconds === "number" &&
        check_body.time_out_seconds % 1 === 0 &&
        check_body.time_out_seconds >= 1 &&
        check_body.time_out_seconds <= 5
            ? check_body.time_out_seconds
            : false;

    return re_check_body;
};

validators.validated_check_id = (check_id) => {
    const re_check_id =
        typeof check_id === "string" && check_id.trim().length === 20 ? check_id : false;
    return re_check_id;
};

module.exports = validators;
