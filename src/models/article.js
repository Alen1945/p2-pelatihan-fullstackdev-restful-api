const { dbConnection } = require("../config/db");

exports.CreateDatabase = () => {
  dbConnection.query(
    "CREATE DATABASE IF NOT EXISTS coba_database;",
    (err, result) => {
      console.log("membuat database");
    }
  );
};
