const mysql = require("mysql2");

const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  multipleStatements: true,
});

dbConnection.connect();

const runQuery = (query, callBack) => {
  query = `
  use latihan_livecoding;
  ${query}
  `;
  return dbConnection.query(query, callBack);
};

module.exports = {
  dbConnection,
  runQuery,
};
