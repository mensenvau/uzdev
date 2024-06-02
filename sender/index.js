// import .env file.
require("../function/dotenv")

const { emailSender } = require("./email")
const { smsSender } = require("./sms")

module.exports = {
    emailSender, smsSender
}