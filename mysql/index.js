const mysql = require("mysql2/promise");
const { MYSQL_USERNAME, MYSQL_HOST, MYSQL_DATABASE, MYSQL_PASSWORD, MYSQL_WAIT, MYSQL_CONNECTION_LIMIT, MYSQL_QUEUE_LIMIT, MYSQL_MULTIPLE_STATEMENTS, MYSQL_CONNECT_TIMEOUT, MYSQL_DATE_STR } = process.env;

const pool = mysql.createPool({
  user: MYSQL_USERNAME,
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  password: MYSQL_PASSWORD,
  waitForConnections: MYSQL_WAIT || true,
  connectionLimit: MYSQL_CONNECTION_LIMIT || 10,
  queueLimit: MYSQL_QUEUE_LIMIT || 0,
  multipleStatements: MYSQL_MULTIPLE_STATEMENTS || true,
  connectTimeout: MYSQL_CONNECT_TIMEOUT || 60000,
  dateStrings: MYSQL_DATE_STR || true,
});

(async () => {
  let connection;
  try {
    connection = await pool.getConnection();
    console.log("\x1b[32m%s\x1b[0m", `Successfully connected to MySQL.`);
  } catch (err) {
    console.error("\x1b[31m%s\x1b[0m", `Could not connect to MySQL: ${err.message}`);
    process.exit(1);
  } finally {
    if (connection) connection.release();
  }
})();

const execute = async (query, params, isRow = 0) => {
  try {
    const [rows, fields] = await pool.query(query, params);
    return isRow ? rows[0] : rows;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = { execute };
