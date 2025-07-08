const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

//home route
router.get("/", authController.home);

//Register route
router.post("/signup", authController.register);

//Login route
router.post("/login", authController.login);

//user profile route
router.get("/user", authController.user);

//Profile update route
// router.put("/profile", authController.profile);

module.exports = router;
