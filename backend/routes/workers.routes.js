const express = require("express");
const router = express.Router();
const workersController = require("../controllers/workers.controller");
const adminMiddleware = require("../middleware/admin-middleware");

//admin home route
router.get("/home", adminMiddleware, workersController.workersHome);

// Get all workers route
router.get("/getAll", adminMiddleware, workersController.getAllWorkers);

router.get("/getworker/:id", adminMiddleware, workersController.getWorkerById);

module.exports = router;
