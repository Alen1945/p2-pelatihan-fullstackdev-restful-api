const CategoryRouter = require("express").Router();
const {
  CreateCategory,
  GetAllCategory,
  GetDetailCategory,
  UpdateCategory,
} = require("../controllers/category");

CategoryRouter.post("/", CreateCategory);
CategoryRouter.get("/", GetAllCategory);
CategoryRouter.get("/:id", GetDetailCategory);
CategoryRouter.patch("/:id", UpdateCategory);

module.exports = CategoryRouter;
