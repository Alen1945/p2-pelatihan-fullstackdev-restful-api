const article = require("./article");
const category = require("./category");

module.exports = {
  tables: [...article.Tables, ...category.Tables],
  relation: [...article.Relations, ...category.Relations],
};
