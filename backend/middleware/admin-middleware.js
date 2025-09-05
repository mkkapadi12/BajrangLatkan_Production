require("dotenv").config();
const jwt = require("jsonwebtoken");
const ADMIN = require("../models/admin.model.js");

const adminMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided !" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log("Data :", isVerified);

    const userData = await ADMIN.findOne({ email: isVerified.email }).select({
      password: 0,
      confirmPassword: 0,
    });

    req.admin = userData;
    req.adminToken = token;
    req.adminId = userData._id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired, please login again" });
    }
    return res.status(401).json({ msg: "Unauthorized! Invalid Token" });
  }
};

module.exports = adminMiddleware;
