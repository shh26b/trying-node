/*
 * IN THE NAME OF ALLAH
 * Title: Utilities
 * Description: All utilities function
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const crypto = require("crypto");
const env = require("./environments");

const utilities = {};

// parse JSON String to Object
utilities.parse_json = (json_string) => {
    let final_object;
    try {
        final_object = JSON.parse(json_string);
    } catch {
        final_object = {};
    }
    return final_object;
};

// hash string
utilities.hash = (str) => {
    if (typeof str === "string" && str.length > 0) {
        return crypto.createHmac("sha256", env.secret_key).update(str).digest("hex");
    }
    return false;
};

utilities.create_random_string = (str_length) => {
    const length = typeof str_length === "number" && str_length > 0 ? str_length : false;
    let output = "";
    if (length) {
        const chars = "abcdefghtjklmnopqrstwxyz0123456789";
        for (let i = 1; i <= length; i += 1) {
            const random_char = chars.charAt(Math.floor(Math.random() * chars.length));
            output += random_char;
        }
        return output;
    }
    return false;
};

utilities.validated_user_phone = (phone) => {
    const re_phone = typeof phone === "string" && phone.trim().length === 11 ? phone : false;
    return re_phone;
};

utilities.validated_user_password = (password) => {
    const re_password =
        typeof password === "string" && password.trim().length > 0 ? password : false;
    return re_password;
};

utilities.validated_token_id = (token_id) => {
    const re_token_id =
        typeof token_id === "string" && token_id.trim().length === 20 ? token_id : false;
    return re_token_id;
};

utilities.validated_extend = (extend) => extend === true;

utilities.validated_user = (body) => {
    const re_body = {};

    re_body.first_name =
        typeof body.first_name === "string" && body.first_name.trim().length > 0
            ? body.first_name
            : false;
    re_body.last_name =
        typeof body.last_name === "string" && body.last_name.trim().length > 0
            ? body.last_name
            : false;
    re_body.phone = utilities.validated_user_phone(body.phone);
    re_body.password = utilities.validated_user_password(body.password);
    re_body.tos_agreement = typeof body.tos_agreement === "boolean" ? body.tos_agreement : false;

    return re_body;
};

module.exports = utilities;
