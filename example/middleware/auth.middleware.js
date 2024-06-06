const { deCode } = require("uzdev/function");

const authCheck = (req, res, next) => {
    try {
        let header = req.headers["authorization"];
        if (header && header.startsWith("Bearer ")) {
            let token = header.slice(7); // Remove "Bearer " prefix
            req.user = deCode(token);
            req.user_id = req.user?.user_id
        }
    } catch (err) {
        console.log(`Message: ${err.message}, Code: authCheck`);
    }
    next();
};

const authStop = (req, res, next) => {
    try {
        let { type, user_id } = req?.user || {};
        if (!req.user || type !== "user_token" || !user_id) {
            throw new Error("You do not have permission to proceed!");
        }
        next();
    } catch (err) {
        next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
};

module.exports = {
    authCheck,
    authStop
};
