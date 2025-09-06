const mongoose = require("mongoose");

const monthEntrySchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g. "September-2025"
  totalPackets: { type: Number, default: 0 },
  productSummary: [
    {
      productName: { type: String },
      packets: { type: Number, default: 0 },
      totalEarnings: { type: Number, default: 0 },
    },
  ],
  totalEarnings: { type: Number, default: 0 }, // sum of all products
});

const salarySchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Worker",
      required: true,
    },
    months: [monthEntrySchema], // full salary history
  },
  { timestamps: true }
);

const SALARY = mongoose.model("Salary", salarySchema);
module.exports = SALARY;
