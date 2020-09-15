const CategoryRouter = require("express").Router();
const { CreateCategory } = require("../controllers/category");

CategoryRouter.post("/", CreateCategory);

module.exports = CategoryRouter;
