require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
//Logger
app.use(morgan("tiny"));

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Router
const ArtilceRouter = require("./src/routes/article");
const CategoryRouter = require("./src/routes/category");
const AuthRouter = require("./src/routes/auth");
const UserProfile = require("./src/routes/user");
//Routing

app.get("/", (req, res) => {
  res.status(200).send({
    msg: "API WORK",
  });
});

app.use("/article", ArtilceRouter);
app.use("/category", CategoryRouter);
app.use("/auth", AuthRouter);
app.use("/profile", UserProfile);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      msg: err.message || "Internal Server Error",
    },
  });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});

//ENVIRONMENT Variable
//CORS
