const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");
const workerDataController = require("../controllers/workerdata.controller");
//Worker Side Data Routes
router.get("/data", workerDataController.home);

router.get("/workhistory", authMiddleware, workerDataController.getWorkHistory);

module.exports = router;
