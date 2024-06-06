const express = require('express');
const { authCheck, authStop } = require('../middleware/auth.middleware');
const app = express()

// auth check
app.use(authCheck)

require('./public.routes')(app);
require('./auth.routes')(app);

// auth stop
app.use(authStop)


module.exports = app 