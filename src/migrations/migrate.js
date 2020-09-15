const { dbConnection } = require("../config/db");
const { tables, relation } = require("./listMigration");

dbConnection.query(
  `
CREATE DATABASE IF NOT EXISTS latihan_livecoding;
use latihan_livecoding;
${tables.join(";")};
`,
  (err, result) => {
    if (!err) {
      console.log(`
      use latihan_livecoding;
      ${relation.join(";")}`);

      dbConnection.query(
        `
      use latihan_livecoding;
      ${relation.join(";")}`,
        (err, result) => {
          if (!err) {
            console.log("Migation Success");
          } else {
            console.log("Migration Failed");
            console.log(err);
          }
          dbConnection.end();
        }
      );
    } else console.log("Migration Failed");
    console.log(err);
  }
);
