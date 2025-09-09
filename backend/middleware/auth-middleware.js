require("dotenv").config();
const jwt = require("jsonwebtoken");
const WORKER = require("../models/worker.model.js");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  // console.log("Auth Token:", token);

  if (!token) {
    return res
      .status(401)
      .json({ msg: "Unauthorized HTTP, Token not provided !" });
  }

  const jwtToken = token.replace("Bearer", "").trim();
  // console.log("JWT Token:", jwtToken);
  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    // console.log("Data :", isVerified);

    const userData = await WORKER.findOne({ email: isVerified.email }).select({
      password: 0,
      confirmPassword: 0,
    });
    // console.log("WorkerData :", userData);

    req.user = userData;
    req.token = token;
    req.userId = userData._id;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ msg: "Token expired, please login again" });
    }
    return res.status(401).json({ msg: "Unauthorized! Invalid Token" });
  }
};

module.exports = authMiddleware;
