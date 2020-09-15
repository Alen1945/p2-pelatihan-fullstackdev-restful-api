const { CreateDatabase } = require("../models/article");
exports.GetAllArticle = (req, res) => {
  res.send({
    data: [
      { name: "article 1" },
      { name: "article 2" },
      { name: "article 3" },
      { name: "article 4" },
    ],
    metadata: {},
  });
};

exports.CreateArticle = (req, res) => {
  console.log(req.body);
  CreateDatabase();
  res.status(200).send({
    msg: "Create Success",
  });
};
