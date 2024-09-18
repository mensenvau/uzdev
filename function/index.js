// import .env file.
require("../function/dotenv");

const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");

const { JWT_KEY, JWT_EXPIRES_IN } = process.env;

let enCode = (data) => {
    return jwt.sign(data, JWT_KEY || "RANDOM@KEY", { expiresIn: JWT_EXPIRES_IN || 100 });
};

let deCode = (encrypted) => {
    return jwt.verify(encrypted, JWT_KEY || "RANDOM@KEY");
};

let randomCode = (length) => {
    return randomstring.generate({ length: length, charset: "numeric" });
};

const fnCatch = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
        next(new Error(err.message));
    });
};

module.exports = {
    enCode,
    deCode,
    randomCode,
    fnCatch,
};
