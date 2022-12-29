/*
 * IN THE NAME OF ALLAH
 * Title: Workers file
 * Description: Workers related file
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/25/2022
 */

// dependencies
const url = require("url");
const http = require("http");
const https = require("https");
const data = require("./data");
const notifications = require("./notifications");
const environments = require("./environments");

// worker object - module scaffolding
const worker = {};

// sent notification sms to user if status change
worker.alert_user_to_status_check = (p_new_check_data) => {
    console.log("inside msg");
    const msg = `Alert Your check for ${p_new_check_data.method.toUpperCase()} ${
        p_new_check_data.protocol
    }://${p_new_check_data.url} is currently ${p_new_check_data.status}`;

    notifications.send_twilio_sms(p_new_check_data.user_phone, msg, (err) => {
        if (!err) {
            console.log("SMS seated");
            console.log(`User alerted to a status change via SMS: ${msg}`);
        } else {
            console.log(`There was a problem sms to one of the user! ${err}`);
        }
    });
};

// save check outcome to disk and sent to next process
worker.process_check_outcome = (p_original_check_data, p_check_out_come) => {
    // check if check outcome is up or down
    const status =
        !p_check_out_come.error &&
        p_check_out_come.response_code &&
        p_original_check_data.success_code.indexOf(p_check_out_come.response_code) > -1
            ? "up"
            : "down";

    // decide whether we should alert the user or not
    console.log(p_original_check_data.status, status);
    const alert_wanted = p_original_check_data.status && p_original_check_data.status !== status;

    // update the check data
    const new_check_data = p_original_check_data;
    new_check_data.status = status;
    new_check_data.last_checked = Date.now();

    console.log(alert_wanted);

    // update the check to disk
    data.update("checks", new_check_data.id, new_check_data, (err) => {
        if (!err) {
            // send the check data to next process
            if (alert_wanted) worker.alert_user_to_status_check(new_check_data);
            else console.log("Alert is not needed as there is no status change");
        } else console.log("Error: Trying to save check data one of the check");
    });
};

// perform checks
worker.perform_check = (p_original_check_data) => {
    // prepare the initial check outcome
    let check_out_come = {
        error: false,
        response_code: false,
    };
    // mark the outcome has not been sent yet
    let out_come_sent = false;

    // parse the hostname & full url from the original data
    // eslint-disable-next-line prettier/prettier
    const parsed_url = url.parse(`${p_original_check_data.protocol}://${p_original_check_data.url}`, true);
    const { hostname, path } = parsed_url;

    // construct the request
    const request_obj = {
        protocol: `${p_original_check_data.protocol}:`,
        hostname,
        method: p_original_check_data.method.toUpperCase(),
        path,
        time_out: p_original_check_data.time_out_seconds * 1000,
    };
    const protocol_to_use = p_original_check_data.protocol === "http" ? http : https;

    const req = protocol_to_use.request(request_obj, (res) => {
        // grab the status of the response
        const status = res.statusCode;
        console.log(status);

        check_out_come.response_code = status;
        // update the check outcome and pass to the next functions
        if (!out_come_sent) {
            worker.process_check_outcome(p_original_check_data, check_out_come);
            out_come_sent = true;
        }
    });

    req.on("error", (err) => {
        check_out_come = {
            error: true,
            value: err,
        };
        // update the check outcome and pass to the next functions
        if (!out_come_sent) {
            worker.process_check_outcome(p_original_check_data, check_out_come);
            out_come_sent = true;
        }
    });

    req.on("timeout", () => {
        check_out_come = {
            error: true,
            value: "timeout",
        };
        // update the check outcome and pass to the next functions
        if (!out_come_sent) {
            worker.process_check_outcome(p_original_check_data, check_out_come);
            out_come_sent = true;
        }
    });

    // req send
    req.end();
};

// validate individual check data
worker.validated_check_data = (p_original_check_data) => {
    if (p_original_check_data && p_original_check_data.id) {
        const original_check_data = { ...p_original_check_data };
        original_check_data.status =
            typeof p_original_check_data.status === "string" &&
            ["up", "down"].indexOf(p_original_check_data.status) > -1
                ? p_original_check_data.status
                : false;
        original_check_data.last_checked =
            original_check_data.last_checked === "string" && original_check_data.last_checked > 0
                ? original_check_data.last_checked
                : false;
        // pass to the next function
        worker.perform_check(original_check_data);
    } else {
        console.log("Error: check was invalid or not properly formatted");
    }
};

// lookup all the checks
worker.gather_all_checks = () => {
    // get all the checks
    data.list("checks", (err, checks) => {
        if (!err && checks && checks.length) {
            checks.forEach((check) => {
                console.log(`Checking : ${check}`);
                // read the check data
                data.read("checks", check, (err2, original_check_data) => {
                    if (!err2 && original_check_data) {
                        // pass the data to the check validator
                        worker.validated_check_data(original_check_data);
                    } else {
                        console.log("Error: reading one of the check data");
                    }
                });
            });
        } else console.log("Error: could not find any checks to process");
    });
};

// timer to execute the worker process once per minute
worker.loop = () => {
    setInterval(() => {
        console.log("loop running: ");
        worker.gather_all_checks();
    }, environments.loop_time_to_check);
};

// start the workers
worker.init = () => {
    console.log("Workers started");

    // execute all the checks
    worker.gather_all_checks();

    // call the loop so that checks continue
    worker.loop();
};

module.exports = worker;
