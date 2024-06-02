// import .env file.
require("../function/dotenv")

const jwt = require('jsonwebtoken');
const { JWT_KEY, JWT_EXPIRES_IN } = process.env;

let encode = (data) => {
    return jwt.sign(data, JWT_KEY || "RANDOM@KEY", { expiresIn: JWT_EXPIRES_IN || 100 });
}

let decode = (encrypted) => {
    return jwt.verify(encrypted, JWT_KEY || "RANDOM@KEY");
}

module.exports = {
    encode, decode
}