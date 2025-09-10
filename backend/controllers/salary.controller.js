const SALARY = require("../models/salary.model");

const salaryHome = async (req, res) => {
  res.status(200).send("Welcome Salary Route !!");
};

const salaryDetails = async (req, res) => {
  try {
    const salaries = await SALARY.find().populate("worker");
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary details", error });
  }
};

const salaryDetailsByWorker = async (req, res) => {
  const { workerId } = req.params;
  try {
    const salary = await SALARY.findOne({ worker: workerId }).populate(
      "worker"
    );
    if (!salary) {
      return res
        .status(404)
        .json({ message: "Salary details not found for this worker" });
    }
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: "Error fetching salary details", error });
  }
};

module.exports = {
  salaryHome,
  salaryDetails,
  salaryDetailsByWorker,
};
