const WORK = require("../models/work.model");
const SALARY = require("../models/salary.model");
const WORKER = require("../models/user.model");

const workHome = async (req, res) => {
  res.status(200).send("Welcome Work Route !!");
};

// Add daily work for worker
const addDailyWork = async (req, res) => {
  try {
    const { workerId, date, products } = req.body;
    const workDate = new Date(date);
    const monthYear = workDate.toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    // 1. Find or create Work document for this worker & month
    let work = await WORK.findOne({ worker: workerId, month: monthYear });
    if (!work) {
      work = new WORK({
        worker: workerId,
        month: monthYear,
        dailyWork: [],
      });
    }

    // 2. Check if entry already exists for this date
    let dailyEntry = work.dailyWork.find(
      (d) => new Date(d.date).toDateString() === workDate.toDateString()
    );

    if (dailyEntry) {
      // 👉 Update existing entry
      products.forEach((p) => {
        let existingProduct = dailyEntry.products.find(
          (prod) => prod.productName === p.productName
        );

        if (existingProduct) {
          // If product exists → increment packets & total
          existingProduct.packets += p.packets;
          existingProduct.total += p.packets * p.rate;
        } else {
          // If new product → push
          dailyEntry.products.push({
            productName: p.productName,
            packets: p.packets,
            rate: p.rate,
            total: p.packets * p.rate,
          });
        }
      });

      // Recalculate total earnings for this day
      dailyEntry.totalEarnings = dailyEntry.products.reduce(
        (sum, prod) => sum + prod.total,
        0
      );
    } else {
      // 👉 Create new entry for this date
      const newEntry = {
        date: workDate,
        products: products.map((p) => ({
          productName: p.productName,
          packets: p.packets,
          rate: p.rate,
          total: p.packets * p.rate,
        })),
        totalEarnings: products.reduce((sum, p) => sum + p.packets * p.rate, 0),
      };
      work.dailyWork.push(newEntry);
    }

    await work.save();

    // 3. Update Salary document
    let salary = await SALARY.findOne({ worker: workerId });
    if (!salary) {
      salary = new SALARY({
        worker: workerId,
        months: [],
      });
    }

    let monthEntry = salary.months.find((m) => m.month === monthYear);
    if (!monthEntry) {
      monthEntry = {
        month: monthYear,
        totalPackets: 0,
        productSummary: [],
        totalEarnings: 0,
      };
      salary.months.push(monthEntry);
    }

    // Reset summary for this month
    const allProducts = work.dailyWork.flatMap((d) => d.products);
    monthEntry.productSummary = [];

    allProducts.forEach((p) => {
      let summary = monthEntry.productSummary.find(
        (s) => s.productName === p.productName
      );
      if (summary) {
        summary.packets += p.packets;
        summary.totalEarnings += p.total;
      } else {
        monthEntry.productSummary.push({
          productName: p.productName,
          packets: p.packets,
          totalEarnings: p.total,
        });
      }
    });

    monthEntry.totalPackets = monthEntry.productSummary.reduce(
      (sum, s) => sum + s.packets,
      0
    );
    monthEntry.totalEarnings = monthEntry.productSummary.reduce(
      (sum, s) => sum + s.totalEarnings,
      0
    );

    await salary.save();

    res.status(200).json({
      msg: "Work added/updated & Salary updated successfully",
      work,
      salary,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

module.exports = { addDailyWork, workHome };
