const router = require("express").Router();
const { stat } = require("fs");
const Worker = require("../models/worker.model");

// Get all workers with filtering and sorting
router.get("/", async (req, res) => {
  try {
    const { name, role, status, sortBy } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (role) {
      query.role = { $regex: role, $options: "i" };
    }
    if (status && status !== "all") {
      query.status = { $regex: status };
    }

    let sortOptions = {};
    if (sortBy === "experience-asc") {
      sortOptions.experience = 1;
    } else if (sortBy === "experience-desc") {
      sortOptions.experience = -1;
    } else if (sortBy === "salary-asc") {
      sortOptions.salary = 1;
    } else if (sortBy === "salary-desc") {
      sortOptions.salary = -1;
    } else if (sortBy === "name") {
      sortOptions.name = 1;
    } else if (sortBy === "role") {
      sortOptions.role = 1;
    } else {
      sortOptions = {};
    }
    // Fetch workers with the query and sort options
    const workers = await Worker.find(query).sort(sortOptions);
    res.json(workers);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Add new worker
router.post("/", async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    res.json(savedWorker);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Update worker
router.put("/:id", async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedWorker);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Get a single worker by ID
router.get("/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json("Worker not found");
    res.json(worker);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

// Delete worker
router.delete("/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.json("Worker deleted successfully");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
