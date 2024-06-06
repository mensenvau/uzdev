const { authCode, authPhone } = require("../controllers/auth.controllers");
const { schemaAuthCode, schemaAuthPhone } = require("../schema/auth.schema");
const { body } = require("uzdev/joi")

module.exports = function (app) {
    app.post("/auth/phone", body(schemaAuthPhone), authPhone);
    app.post("/auth/code", body(schemaAuthCode), authCode);
};
