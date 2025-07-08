const USER = require("../models/user.model");

//Home Auth route Controller :
const home = (req, res) => {
  res.status(201).send("Hello Auth Route !");
};

//Register Auth route Controller :
const register = async (req, res) => {
  try {
    const user = req.body; // Extract the body from the request
    console.log("THIS IS USER", user);
    const { email } = user;

    // Check if the email already exists
    const userExist = await USER.findOne({ email });

    if (userExist) {
      return res
        .status(400)
        .json({ msg: "Email Already Registered!", email: userExist });
    }

    // If email does not exist, create the user
    const newUser = await USER.create(user);
    console.log("THIS IS NEW USER", newUser);

    return res.status(201).json({
      msg: "Registration successfully!",
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
    });
  } catch (error) {
    return res.status(500).json({ msg: "Internal server error." });
  }
};

//Login Auth route Controller :

// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //It is valid or not ?
//     const userExist = await USER.findOne({ email });

//     if (!userExist) {
//       return res.status(400).json({ msg: "Invalid Credentials !" });
//     }

//     const user = await userExist.comparePassword(password);

//     if (user) {
//       return res.status(200).json({
//         msg: "Login successfully!",
//         token: await userExist.generateToken(),
//         userId: userExist._id.toString(),
//       });
//     } else {
//       return res.status(400).json({ msg: "Invalid Credentials !" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

//User Auth route Controller :

// const user = async (req, res) => {
//   try {
//     const userData = req.user;
//     return res.status(200).json({ userData });
//   } catch (error) {
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

//Profile Route :

// const profile = async (req, res) => {
//   try {
//     const { _id } = req.user;

//     const updatedData = req.body;

//     if (!_id) {
//       return res.status(400).json({ message: "User ID is required." });
//     }

//     // If file is uploaded, get the Cloudinary URL
//     if (req.file) {
//       updatedData.profileImage = req.file.path;
//     }

//     const user = await USER.findByIdAndUpdate(_id, updatedData, { new: true });

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     return res.status(200).json({ message: "User updated successfully", user });
//   } catch (error) {
//     console.error("Error updating user:", error);
//     return res.status(500).json({ message: "Internal server error." });
//   }
// };

module.exports = { home, register };
