const ADMIN = require("../models/admin.model.js");
const WORKER = require("../models/worker.model.js");

// Admin Home Controller
const getAdminHome = (req, res) => {
  res.status(200).send("Welcome to Admin Route!");
};

// Admin Registration Controller
const registerAdmin = async (req, res) => {
  try {
    const { adminname, email, password, confirmPassword, phone, photo } =
      req.body;

    // 1. Check if email already exists
    const existingAdmin = await ADMIN.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ msg: "Admin already registered!" });
    }

    // 2. Create new admin
    const newAdmin = new ADMIN({
      adminname,
      email,
      password,
      confirmPassword,
      phone,
      photo,
    });

    await newAdmin.save();

    return res.status(201).json({
      msg: "Admin registered successfully!",
      token: await newAdmin.generateToken(),
      adminId: newAdmin._id.toString(),
      data: newAdmin,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if admin exists
    const adminExist = await ADMIN.findOne({ email });

    if (!adminExist) {
      return res.status(404).json({ msg: "Admin not found!" });
    }

    if (!adminExist) {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }

    // 2. Check password
    const admin = await adminExist.comparePassword(password);

    if (admin) {
      return res.status(200).json({
        msg: "Admin login successful!",
        token: await adminExist.generateToken(),
        adminId: adminExist._id.toString(),
        data: adminExist,
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }
  } catch (error) {
    console.error("Login Error:", error.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

//Admin Auth route Controller :

const adminAuth = async (req, res) => {
  try {
    const adminData = req.admin;
    // console.log("Admin Data:", adminData);
    return res.status(200).json({ adminData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  registerAdmin,
  getAdminHome,
  loginAdmin,
  adminAuth,
};
