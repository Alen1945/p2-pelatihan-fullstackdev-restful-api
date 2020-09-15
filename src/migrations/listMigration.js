const article = require("./article");

module.exports = {
  tables: [...article.Tables],
  relation: [...article.Relations],
};
