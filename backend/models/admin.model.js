require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema(
  {
    adminname: {
      type: String,
      required: [true, "Admin name is required"],
      unique: true,
      trim: true,
      minlength: 3,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    confirmPassword: {
      type: String,
      required: [true, "Please confirm your password"],
    },

    photo: {
      type: String, // store image URL (Cloudinary, S3, or local path)
    },

    phone: {
      type: String,
      unique: true, // each admin must have unique phone
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

// 🔑 Hash password before saving
adminSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(this.password, salt);
    this.password = hash_password;
    next();
  } catch (error) {
    next(error);
  }
});

// 🔑 Compare password method
adminSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔑 Generate JWT token method
adminSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        adminId: this._id.toString(),
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

const ADMIN = mongoose.model("Admin", adminSchema);

module.exports = ADMIN;
