const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { User } = require("../model/userModel");

const protectUser = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer") || req.cookies.token) {
    try {
      token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

      if (!token) {
        return res.status(401).json({ message: "Unauthorized, no token provided" });
      }

      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
      req.userId = decoded.id;

      const foundUser = await User.findById(decoded.id).select("-password");

      if (!foundUser) {
        return res.status(401).json({ message: "Unauthorized, user not found" });
      }

      req.user = foundUser;
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, no token" });
  }
});

module.exports = { protectUser };