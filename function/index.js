// import .env file.
require("../function/dotenv")

const jwt = require('jsonwebtoken');
const randomstring = require("randomstring")

const { JWT_KEY, JWT_EXPIRES_IN } = process.env;

let enCode = (data) => {
    return jwt.sign(data, JWT_KEY || "RANDOM@KEY", { expiresIn: JWT_EXPIRES_IN || 100 });
}

let deCode = (encrypted) => {
    return jwt.verify(encrypted, JWT_KEY || "RANDOM@KEY");
}

let createCode = (length) => {
    return randomstring.generate({ length: length, charset: 'numeric' })
}

module.exports = {
    enCode, deCode, createCode
}