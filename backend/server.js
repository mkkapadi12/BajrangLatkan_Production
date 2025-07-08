const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const auth_route = require("./routes/auth.routes");

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes
app.get("/api", (req, res) => {
  res.send("Welcome to Bajrang Latkan API");
});
app.use("/api/auth", auth_route);
app.use("/api/products", require("./routes/products"));
app.use("/api/workers", require("./routes/workers"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
