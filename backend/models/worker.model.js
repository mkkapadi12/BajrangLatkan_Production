require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const workerSchema = new mongoose.Schema(
  {
    // Personal Information
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    fatherHusbandName: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    photo: {
      type: String, // store image URL (Cloudinary, S3, or local path)
    },

    // Contact Information
    phone: {
      type: String,
      required: true,
      unique: true, // each worker must have unique phone
    },
    alternatePhone: {
      type: String,
    },
    address: {
      village: { type: String },
      taluka: { type: String },
      district: { type: String },
    },
    emergencyContact: {
      name: { type: String },
      phone: { type: String },
    },

    // Work Preferences / Skills
    skills: {
      type: [String], // e.g., ["Beads", "Threads", "Embroidery"]
    },
    workPreference: {
      type: String,
      enum: ["Full-time", "Part-time"],
    },
    experience: {
      type: Number, // in years
    },
    notes: {
      type: String, // admin remarks
    },

    // Bank / Payment Details
    bankDetails: {
      accountHolderName: { type: String },
      accountNumber: { type: String },
      ifsc: { type: String },
      upiId: { type: String },
    },

    // Login Credentials
    workerId: {
      type: String,
      unique: true,
      required: false,
    },
    email: {
      type: String, // can be phone or email
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true, // hashed password
    },
    confirmPassword: {
      type: String,
      required: true, // hashed password
    },

    // System Fields (Admin only)
    dateOfJoining: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    supervisor: {
      type: String, // Parent who manages (e.g., "Father" or "Mother")
    },
  },
  { timestamps: true }
);

//Secure the password with bcrypt + Auto-generate WorkerId
workerSchema.pre("save", async function (next) {
  const user = this;

  try {
    // 🔹 Generate Worker ID only for new workers
    if (user.isNew) {
      const lastWorker = await this.constructor
        .findOne({}, { workerId: 1 })
        .sort({ createdAt: -1 }); // Get the last created worker

      let newId = "WORKER01"; // Default ID for first worker

      if (lastWorker && lastWorker.workerId) {
        const lastIdNum = parseInt(
          lastWorker.workerId.replace("WORKER", ""),
          10
        );
        const nextIdNum = lastIdNum + 1;
        newId = `WORKER${nextIdNum.toString().padStart(2, "0")}`;
      }

      user.workerId = newId;
    }

    // 🔹 Hash password only if modified
    if (user.isModified("password")) {
      const saltRound = await bcrypt.genSalt(10);
      const hash_password = await bcrypt.hash(user.password, saltRound);
      user.password = hash_password;
    }

    next();
  } catch (error) {
    next(error);
  }
});

//compare the password

workerSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//create json web token

workerSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        // role: this.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

const WORKER = mongoose.model("Workers", workerSchema);

module.exports = WORKER;
