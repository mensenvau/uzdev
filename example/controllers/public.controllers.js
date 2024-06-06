exports.helloWorld = async (req, res, next) => {
    try {
        res.json({ message: "Hello World" });
    } catch (err) {
        next(new Error(JSON.stringify({ message: err.message, code: "router" })));
    }
};


