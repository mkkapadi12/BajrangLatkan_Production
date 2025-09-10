const express = require("express");
const router = express.Router();
const salaryController = require("../controllers/salary.controller");
const adminMiddleware = require("../middleware/admin-middleware");
//salary home route

router.get("/", salaryController.salaryHome);

router.get("/salarydetails", adminMiddleware, salaryController.salaryDetails);

router.get(
  "/worker/:workerId",
  adminMiddleware,
  salaryController.salaryDetailsByWorker
);

module.exports = router;
