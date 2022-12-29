/*
 * IN THE NAME OF ALLAH
 * Title: Notification Library
 * Description: All utilities function
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/23/2022
 */

const https = require("https");
const querystring = require("querystring");
const env = require("./environments");

const notifications = {};

// send sms to user using twilio api
notifications.send_twilio_sms = (p_phone, p_msg, callback) => {
    // input validation
    const phone =
        typeof p_phone === "string" && p_phone.trim().length === 11 ? p_phone.trim() : false;

    const msg =
        typeof p_msg === "string" && p_msg.trim().length > 0 && p_msg.trim().length <= 1600
            ? p_msg.trim()
            : false;
    if (phone && msg) {
        // configure the request payload
        const payload = {
            From: env.twilio.from_phone,
            To: `+88${phone}`,
            Body: msg,
        };

        // stringify the payload
        const payload_str = querystring.stringify(payload);

        // configure the request details
        const request_details = {
            hostname: "api.twilio.com",
            method: "POST",
            path: `/2010-04-01/Accounts/${env.twilio.account_sid}/Messages.json`,
            auth: `${env.twilio.account_sid}:${env.twilio.auth_token}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        // instantiate the request object
        const req = https.request(request_details, (res) => {
            // get the status of the sent request
            const status = res.statusCode;
            // callback successfully if the request went through
            if (status === 200 || status === 201) {
                callback(false);
            } else {
                callback(`Status code returned was ${status}`);
            }
        });

        req.on("error", (err) => {
            callback(err);
        });

        req.write(payload_str);
        req.end();
    } else {
        callback("Given parameters were missing or invalid!");
    }
};

module.exports = notifications;
