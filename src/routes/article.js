const ArticleRouter = require("express").Router();
const { GetAllArticle, CreateArticle } = require("../controllers/article");

ArticleRouter.get("/", GetAllArticle);
ArticleRouter.post("/", CreateArticle);

module.exports = ArticleRouter;
