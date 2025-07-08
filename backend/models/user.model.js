require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { type } = require("os");

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  phone: {
    type: Number,
  },

  experience: {
    type: Number,
  },

  dateOfBirth: {
    type: Date,
  },

  address: {
    type: String,
  },

  gender: {
    type: String,
    enum: ["MALE", "FEMALE", "OTHER"],
  },

  profileImage: {
    type: String,
  },

  agreeToTerms: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["EMPLOYEE", "ADMIN"],
    default: "EMPLOYEE",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

//Secure the password with bcrypt
UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
});

//compare the password

UserSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//create json web token

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        role: this.role,
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

const USER = mongoose.model("User", UserSchema);

module.exports = USER;
