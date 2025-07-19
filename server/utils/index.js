const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN, { expiresIn: "7d" });
};

module.exports = {
  generateToken
};