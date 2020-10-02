const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Signup, GetUserData } = require("../models/auth");

exports.Signup = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("username and password is required");
    }
    const hashPassword = bycrypt.hashSync(req.body.password);
    const result = await Signup(req.body.username, hashPassword);

    res.status(201).send({
      data: {
        username: req.body.username,
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

exports.Login = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      throw new Error("username and password is required");
    }
    const result = await GetUserData(req.body.username);
    if (result[1].length > 0) {
      const dataUser = result[1][0];

      if (bycrypt.compareSync(req.body.password, dataUser.password)) {
        const token = jwt.sign(
          {
            id: dataUser.id,
            username: dataUser.username,
            role: "admin",
          },
          "1234567989",
          {
            expiresIn: "1D",
          }
        );
        res.status(200).send({
          data: {
            accessToken: token,
          },
        });
      } else {
        throw new Error("username or password wrong");
      }
    } else {
      throw new Error("username or password wrong");
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      error: {
        msg: error.message || "Something wrong",
      },
    });
  }
};
