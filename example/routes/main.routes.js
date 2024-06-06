const express = require('express');
const { authCheck, authStop } = require('../middleware/auth.middleware');
const app = express()

// auth check
app.use(authCheck)

require('./public.routes')(app);
// require('./auth.routes')(app); // if you need you can comment out.

// auth stop
app.use(authStop)


module.exports = app 