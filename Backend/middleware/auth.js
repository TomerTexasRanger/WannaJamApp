const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Not autherized, please provide a valid token");

  try {
    const decoded = jwt.verify(token, config["JWT-KEY"]);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid Token");
  }
};
