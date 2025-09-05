const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const adminMiddleware = require("../middleware/admin-middleware");
//admin home route

router.get("/index", adminController.getAdminHome);

// Admin registration route
router.post("/signup", adminController.registerAdmin);

// Admin login route
router.post("/login", adminController.loginAdmin);

//admin auth
router.get("/auth", adminMiddleware, adminController.adminAuth);

module.exports = router;
