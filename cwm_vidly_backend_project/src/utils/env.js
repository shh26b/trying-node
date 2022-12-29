const APP_PORT = parseInt(process.env.PORT) || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "key";
const JWT_EXPIRES_IN_MINUTE = parseInt(process.env.JWT_EXPIRES_IN_MINUTE) || 43200;
const NODE_ENV = process.env.NODE_ENV || "production";

const verifyEnv = () => {
    if (!APP_PORT)
        throw new Error("Must have APP_PORT in env");
    if (!MONGODB_URI)
        throw new Error("Must have MONGODB_URI in env")
    if (!JWT_SECRET_KEY)
        throw new Error("Must have JWT_SECRET_KEY in env");
    if (!JWT_EXPIRES_IN_MINUTE)
        throw new Error("Must have JWT_EXPIRES_IN_MINUTE in env");
};

const runNotInTest = callback => { if (NODE_ENV !== "test") callback(); };
const runNotInProd = callback => { if (NODE_ENV !== "production") callback(); };

module.exports = {
    JWT_EXPIRES_IN_MINUTE,
    JWT_SECRET_KEY,
    APP_PORT,
    NODE_ENV,
    MONGODB_URI,
    verifyEnv,
    runNotInTest,
    runNotInProd
}
