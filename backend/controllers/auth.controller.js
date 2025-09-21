const WORKER = require("../models/worker.model.js");
//Home Auth route Controller :
const home = (req, res) => {
  res.status(201).send("Hello Auth Route !");
};

// Register Auth route Controller :

const register = async (req, res) => {
  try {
    const {
      fullName,
      fatherHusbandName,
      dateOfBirth,
      gender,
      photo,
      phone,
      alternatePhone,
      address,
      emergencyContact,
      skills,
      workPreference,
      experience,
      notes,
      bankDetails,
      email,
      password,
      confirmPassword,
      supervisor,
    } = req.body;

    // 1. Check if email OR phone already exists
    const existingUser = await WORKER.findOne({
      $or: [{ email }, { phone }],
    });

    if (existingUser) {
      return res.status(400).json({ msg: "Worker already registered!" });
    }

    // 2. Create new worker
    const newWorker = new WORKER({
      fullName,
      fatherHusbandName,
      dateOfBirth,
      gender,
      photo,
      phone,
      alternatePhone,
      address,
      emergencyContact,
      skills,
      workPreference,
      experience,
      notes,
      bankDetails,
      email,
      password, // password will be hashed automatically by pre-save hook
      confirmPassword,
      supervisor,
    });

    await newWorker.save();

    return res.status(201).json({
      msg: "Worker registered successfully!",
      token: await newWorker.generateToken(),
      workerId: newWorker._id.toString(),
      data: newWorker,
    });
  } catch (error) {
    console.error("Register Error:", error.message);
    return res.status(500).json({ msg: "Internal server error." });
  }
};

//Login Auth route Controller :

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //It is valid or not ?
    const userExist = await WORKER.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      return res.status(200).json({
        msg: "Login successfully!",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res.status(400).json({ msg: "Invalid Credentials !" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error." });
  }
};

//User Auth route Controller :

const user = async (req, res) => {
  try {
    const workerData = req.user;
    // console.log("Worker Data:", workerData);
    return res.status(200).json({ workerData });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { home, register, login, user };
