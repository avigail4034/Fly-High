 const mysql = require('mysql2');


const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'flight',
  port: 3306,
  password: '1qaz2wsx!',
}).promise();

module.exports = pool;