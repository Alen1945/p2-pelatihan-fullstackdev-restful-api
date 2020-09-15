const { runQuery } = require("../config/db");

exports.CreateCategory = (name) => {
  return new Promise((resolve, reject) => {
    runQuery(
      `
        INSERT INTO category(name) values('${name}')
        `,
      (err, result) => {
        if (err) {
          return reject(new Error(err));
        }
        return resolve(result);
      }
    );
  });
};
