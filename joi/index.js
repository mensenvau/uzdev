const convertError = (errors) => {
    return errors?.details?.reduce((acc, { context, message }) => {
        const key = context?.key;
        if (key) {
            acc[key] = message.replace(/^"(.*)" is required$/, "$1 is required");
        }
        return acc;
    }, {});
};

const createValidator = (schema, type) => async (req, res, next) => {
    try {
        await schema.validateAsync(req[type], { abortEarly: false });
        next();
    } catch (err) {
        res.status(422).json({
            code: 4,
            message: "Oops! Something's wrong with the data format, please check and try again",
            details: convertError(err),
        });
    }
};

const validator = (data, schema) => {
    const { error, value } = schema.validate(data, { abortEarly: false });
    if (error) {
        return {
            error: error.details.map(({ message, path }) => ({
                message,
                path: path.join("."),
            })),
        };
    }
    return { value };
};

const body = (schema) => createValidator(schema, "body");
const params = (schema) => createValidator(schema, "params");
const query = (schema) => createValidator(schema, "query");

module.exports = { body, params, query, validator };
