require('./utils/env.utils');
const app = require('./app');

const APP_PORT = process.env.APP_PORT || 3000;
const APP_HOST = process.env.APP_HOST || "127.0.0.1";

app.listen(APP_PORT, () => {
  console.log(`Server running on http://${APP_HOST}:${APP_PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
