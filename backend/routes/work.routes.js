const express = require("express");
const router = express.Router();
const workController = require("../controllers/work.controller");
const adminMiddleware = require("../middleware/admin-middleware");

//work home route

router.get("/", workController.workHome);

router.post("/adddailywork", adminMiddleware, workController.addDailyWork);

module.exports = router;
