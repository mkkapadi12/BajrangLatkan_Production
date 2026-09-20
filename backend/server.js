const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 5000;

/* =======================
   MIDDLEWARES
======================= */
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  }),
);
app.use(express.json());

/* =======================
   ROUTES IMPORT
======================= */
const auth_route = require("./routes/auth.routes");
const admin_route = require("./routes/admin.routes");
const work_route = require("./routes/work.routes");
const workers_route = require("./routes/workers.routes");
const salary_route = require("./routes/salary.routes");
const workerData_route = require("./routes/workerData.routes");
const notification_route = require("./routes/notification.routes");

/* =======================
   ROUTES
======================= */
app.get("/", (req, res) => {
  res.send("Bajrang Latkan API is running");
});

app.get("/api", (req, res) => {
  res.send("Welcome to Bajrang Latkan API");
});

app.use("/api/auth", auth_route);
app.use("/api/admin", admin_route);
app.use("/api/work", work_route);
app.use("/api/workers", workers_route);
app.use("/api/salary", salary_route);
app.use("/api/workerdata", workerData_route);
app.use("/api/notifications", notification_route);
/* =======================
   DATABASE CONNECTION
======================= */
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

/* =======================
   SOCKET.IO SETUP
======================= */
const server = http.createServer(app);

/* =======================
   START SERVER
======================= */
server.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});

/* =======================
   EXPORT SOCKET
======================= */
// module.exports = { io };
