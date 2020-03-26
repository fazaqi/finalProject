const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kukukakikake",
  database: "db_kixstore",
  port: "3306",
  multipleStatements: true
});

module.exports = db;
