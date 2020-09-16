const {
  CreateCategory,
  GetAllCategory,
  GetDetailCategory,
  UpdateCategory,
} = require("../models/category");

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

exports.GetAllCategory = async (req, res) => {
  try {
    let params = {
      page: req.query.page || 1,
      limit: req.query.limit || 5,
    };
    if (req.query.sort) {
      const sortingValue = req.query.sort.split(".");
      params.sort = {
        key: sortingValue[0],
        value: sortingValue[1] ? sortingValue[1].toUpperCase() : "ASC",
      };
    }
    if (req.query.q) {
      params.search = req.query.q;
    }
    const result = await GetAllCategory(params);
    console.log(result[1][0]);
    if (result) {
      const totalData = result[1][0].total;
      const totalPages = Math.ceil(totalData / parseInt(params.limit));
      res.status(200).send({
        data: result[2],
        metadata: {
          pagination: {
            currentPage: params.page,
            totalPages: totalPages,
            nextPage: parseInt(params.page) < totalPages,
            prevPage: parseInt(params.page) > 1,
            limit: parseInt(params.limit),
            total: totalData,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};

exports.GetDetailCategory = async (req, res) => {
  try {
    const result = await GetDetailCategory(req.params.id);
    console.log(result);
    if (result[1][0]) {
      res.status(200).send({
        data: result[1][0],
      });
    } else {
      res.status(404).send({
        data: {},
        msg: "Id Not Found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};

exports.UpdateCategory = async (req, res) => {
  try {
    if (!(Object.keys(req.body).length > 0)) {
      throw new Error("Please add data to update");
    }
    const dataToUpdate = {};
    const fillAble = ["name"];
    fillAble.forEach((v) => {
      if (req.body[v]) {
        dataToUpdate[v] = req.body[v];
      }
    });

    if (!(Object.keys(dataToUpdate).length > 0)) {
      throw new Error("Please add data to update");
    }
    const result = await UpdateCategory(req.params.id, dataToUpdate);
    console.log(result);
    res.status(200).send({
      data: {
        id: req.params.id,
        name: req.body.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(202).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};
