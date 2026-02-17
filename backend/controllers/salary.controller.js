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
      "worker",
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

// pay monthly salary
const payMonthlySalary = async (req, res) => {
  try {
    const { workerId, month, paymentMethod, paymentNotes } = req.body;

    if (!workerId || !month || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const salary = await SALARY.findOne({ worker: workerId });

    if (!salary) {
      return res.status(404).json({ message: "Salary record not found" });
    }

    const monthEntry = salary.months.find((m) => m.month === month);

    if (!monthEntry) {
      return res.status(404).json({ message: "Month data not found" });
    }

    if (monthEntry.status === "Paid") {
      return res.status(400).json({ message: "Salary already paid" });
    }

    // ✅ update payment info
    monthEntry.status = "Paid";
    monthEntry.paymentMethod = paymentMethod;
    monthEntry.paymentNotes = paymentNotes;
    monthEntry.paidAt = new Date();

    await salary.save();

    res.status(200).json({
      message: "Salary paid successfully",
      monthEntry,
    });
  } catch (error) {
    console.error("payMonthlySalary error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  salaryHome,
  salaryDetails,
  salaryDetailsByWorker,
  payMonthlySalary,
};
