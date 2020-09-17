const jwt = require("jsonwebtoken");
async function Authentication(req, res, next) {
  try {
    let token = req.headers.authorization || "";
    console.log("token lama", token);
    if (!token) {
      throw new Error("Not Authorized");
    }
    token = token.replace(/Bearer\s*/, "");
    const payload = jwt.verify(token, "1234567989");
    console.log(payload);
    req.auth = payload;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send({
      msg: err.message || "Not Authorized",
    });
  }
}

module.exports = Authentication;
