const WORKER = require("../models/user.model");

//get Workers Home

const workersHome = (req, res) => {
  res.status(200).send("Welcome to Workers Route!");
};

// Get all workers with filtering, sorting, and pagination
const getAllWorkers = async (req, res) => {
  try {
    const {
      name,
      village,
      gender,
      status,
      sortBy,
      phone,
      page = 1,
      limit = 10,
    } = req.query;

    let query = {};

    // 🔎 Filtering
    if (name) {
      query.fullName = { $regex: name, $options: "i" };
    }
    if (village) {
      query["address.village"] = { $regex: village, $options: "i" };
    }
    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }
    if (gender) {
      query.gender = gender;
    }
    if (status && status !== "all") {
      query.status = status;
    }

    // 🔽 Sorting
    let sortOptions = {};
    switch (sortBy) {
      case "name-asc":
        sortOptions.fullName = 1;
        break;
      case "name-desc":
        sortOptions.fullName = -1;
        break;
      case "experience-asc":
        sortOptions.experience = 1;
        break;
      case "experience-desc":
        sortOptions.experience = -1;
        break;
      case "joining-newest":
        sortOptions.dateOfJoining = -1;
        break;
      case "joining-oldest":
        sortOptions.dateOfJoining = 1;
        break;
      case "status":
        sortOptions.status = 1;
        break;
      default:
        sortOptions.createdAt = -1; // default: newest first
    }

    // 📄 Pagination setup
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const totalWorkers = await WORKER.countDocuments(query);

    // 🛠 Fetch workers with filter + sort + pagination
    const workers = await WORKER.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: workers.length,
      totalWorkers,
      totalPages: Math.ceil(totalWorkers / limit),
      currentPage: parseInt(page),
      data: workers,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error fetching workers",
      error: err.message,
    });
  }
};

//get worker by id
const getWorkerById = async (req, res) => {
  try {
    const workerId = req.params.id;
    // console.log("Worker Id in backend :", workerId);
    const worker = await WORKER.findById(workerId);
    if (!worker) {
      return res.status(404).json({ msg: "Worker not found" });
    }
    res.status(200).json({ msg: "Worker fetched successfully", worker });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

//get workers

const getWorkers = async (req, res) => {
  try {
    const workers = await WORKER.find();
    res.status(200).json({ msg: "Workers fetched successfully", workers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  getAllWorkers,
  workersHome,
  getWorkerById,
  getWorkers,
};
