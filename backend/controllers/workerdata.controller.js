const SALARY = require("../models/salary.model");
const WORK = require("../models/work.model");

const home = (req, res) => {
  res.send("Welcome to Worker Data Home Endpoint !!");
};

const getWorkHistory = async (req, res) => {
  try {
    const { workerId, monthYear } = req.query;

    // Find the work document for the specified worker and month
    const work = await WORK.findOne({
      worker: workerId,
      month: monthYear,
    }).populate("worker");

    if (!work) {
      return res.status(404).json({ message: "No work found for this month" });
    }

    res.status(200).json({
      message: "Monthly work retrieved successfully",
      month: work.month,
      workData: {
        [work.month]: work,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

const getSalaryDetails = async (req, res) => {
  try {
    const { workerId } = req.query;
    const salaryDetails = await SALARY.findOne({ worker: workerId }).populate(
      "worker"
    );

    if (!salaryDetails) {
      return res
        .status(404)
        .json({ message: "No salary details found for this worker" });
    }
    res.status(200).json({
      message: "Salary details retrieved successfully",
      salaryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = {
  home,
  getWorkHistory,
  getSalaryDetails,
};
