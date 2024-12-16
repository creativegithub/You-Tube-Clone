import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import userroutes from "./Routes/User.js";
import videoroutes from "./Routes/Video.js";
import commentroutes from "./Routes/Comment.js";
import grouproutes from "./Routes/Group.js";
import planroutes from "./Routes/Plan.js";
import paymentmethodroutes from "./Routes/Paymentmethod.js";
import paymentroutes from "./Routes/Payment.js";
import callroutes from "./Routes/Call.js";
import path from "path";
import http from "http";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors());
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join("uploads")));

// Root route
app.get("/", (req, res) => {
  res.send("Your You-Tube is working");
});

// Routes
app.use("/user", userroutes);
app.use("/video", videoroutes);
app.use("/comment", commentroutes);
app.use("/groups", grouproutes);
app.use("/plans", planroutes);
app.use("/payementmethod", paymentmethodroutes);
app.use("/payments", paymentroutes);
app.use("/calls", callroutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ error: err.message || "Something went wrong!" });
});

// Database connection
const DB_URL = process.env.DB_URL;
mongoose
  .connect(DB_URL)
  .then(() => console.log("MongoDB Database connected"))
  .catch((error) => console.log("MongoDB connection error:", error));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
});
