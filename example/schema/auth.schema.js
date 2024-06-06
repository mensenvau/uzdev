const Joi = require('joi');

const schemaAuthPhone = Joi.object({
    phone: Joi.string().pattern(/^[0-9]+$/).length(9)
});

const schemaAuthCode = Joi.object({
    sms_token: Joi.string().required(),
    code: Joi.string().pattern(/^[0-9]+$/).length(5)
});

module.exports = {
    schemaAuthPhone, schemaAuthCode
}