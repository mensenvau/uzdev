const { helloWorld } = require("../controllers/public.controllers");

module.exports = function (app) {
    app.get("/", helloWorld);
};
