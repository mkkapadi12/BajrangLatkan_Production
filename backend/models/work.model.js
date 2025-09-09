const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workers",
      required: true,
    },
    month: { type: String, required: true }, // e.g., "September-2025"
    dailyWork: [
      {
        date: { type: Date, required: true },
        products: [
          {
            productName: { type: String, required: true },
            packets: { type: Number, required: true },
            rate: { type: Number, required: true },
            total: { type: Number, required: true },
          },
        ],
        totalEarnings: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const WORK = mongoose.model("Work", workSchema);

module.exports = WORK;
