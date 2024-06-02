const convert = errors => {
    const res = {};
    errors?.details?.forEach(detail => {
        const key = detail?.context?.key;
        const message = detail?.message?.replace(/^"(.*)" is required$/, '$1 is required');
        if (key) res[key] = message;
    });
    return res;
};

const createValidator = schema => async (req, res, next) => {
    try {
        await schema.validateAsync(req[schema.type], { abortEarly: false });
        next();
    } catch (err) {
        res.status(422).json({ message: "Validation error: Invalid format.", details: convert(err) });
    }
};

const body = schema => createValidator({ ...schema, type: 'body' });
const params = schema => createValidator({ ...schema, type: 'params' });

module.exports = { body, params };
