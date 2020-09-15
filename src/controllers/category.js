const { CreateCategory } = require("../models/category");

exports.CreateCategory = async (req, res) => {
  try {
    if (!req.body.name) {
      throw new Error("field name is required");
    }
    const resultQuery = await CreateCategory(req.body.name);
    console.log(resultQuery);
    if (resultQuery) {
      res.status(200).send({
        data: {
          id: resultQuery[1].insertId,
          name: req.body.name,
        },
      });
    } else {
      throw new Error("create failed");
    }
  } catch (error) {
    console.log(error);
    res.status(202).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};
