/*
 * IN THE NAME OF ALLAH
 * Title: Environments
 * Description: Handle all environments related things
 * Author: Shihab Mahamud(github.com/shihab4t)
 * Date: 03/19/2022
 */

const environments = {};

environments.staging = {
    port: 3000,
    env_name: "staging",
    url: "127.0.0.1",
    secret_key: "fasdkfsjdkfsdkfjsdkfjksdfjksdfjksdf",
    token_expire_time_minutes: 60,
    checks_limit: 5,
    twilio: {
        from_phone: "",
        account_sid: "",
        auth_token: "",
    },
    loop_time_to_check: 1000 * 60,
};

environments.production = {
    port: 5000,
    env_name: "production",
    url: "shihab4t.github.io/",
    secret_key: "fasdkfsjdkfsdkfjsdkfjksdfjksdfjksdf",
    token_expire_time_minutes: 60,
    checks_limit: 5,
    twilio: {
        from_phone: process.env.TWILIO_FROM_PHONE,
        account_sid: process.env.TWILIO_ACCOUNT_SID,
        auth_token: process.env.TWILIO_AUTH_TOKEN,
    },
    loop_time_to_check: 1000 * 60,
};

// determine which environment was passed
const current_env = typeof process.env.NODE_ENV === "string" ? process.env.NODE_ENV : "staging";

// export corresponding env object
const env_to_export =
    typeof environments[current_env] === "object"
        ? environments[current_env]
        : environments.staging;

// export module
module.exports = env_to_export;
