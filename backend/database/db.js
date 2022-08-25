require("dotenv").config();
const mysql = require("mysql2/promise");
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DATABASE, MYSQL_PORT } =
  process.env;

let pool;
async function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: MYSQL_HOST || 'localhost',
      user: MYSQL_USER,
      password: MYSQL_PASS,
      database: MYSQL_DATABASE,
      port: MYSQL_PORT || 3306,
      connectionLimit: 10,
      timezone: "Z",
    });
  }
  return await pool.getConnection();
}

module.exports = { getConnection };