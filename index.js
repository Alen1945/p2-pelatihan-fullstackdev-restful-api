const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Logger
app.use(morgan("tiny"));

//BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Router
const ArtilceRouter = require("./src/routes/article");

app.use("/article", ArtilceRouter);

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
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
