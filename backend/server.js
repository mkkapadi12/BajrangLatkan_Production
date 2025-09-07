const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// Import routes
const auth_route = require("./routes/auth.routes");
const admin_route = require("./routes/admin.routes");
const work_route = require("./routes/work.routes");
const workers_route = require("./routes/workers.routes");

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  })
);

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

//Auth Routes
app.use("/api/auth", auth_route);

//Admin Routes
app.use("/api/admin", admin_route);

//Work Routes
app.use("/api/work", work_route);

app.use("/api/workers", workers_route);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
