require("dotenv").config();
const jwt = require("jsonwebtoken");
const USER = require("../models/user.model");

const authMiddleware = async (req, res, next) => {
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

    const userData = await USER.findOne({ email: isVerified.email }).select({
      password: 0,
      confirmPassword: 0,
    });
    // console.log("UserData :", user);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Unauthorized ! Invalid Token" });
  }
};

module.exports = authMiddleware;
