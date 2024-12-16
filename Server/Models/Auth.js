import mongoose from "mongoose";

const userschema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  city: { type: String, default: "Unknown" },
  desc: { type: String },
  plan: {
    type: String,
    enum: ["Free", "Bronze", "Silver", "Gold"],
    default: "Free",
  },
  downloadCounts: { type: Number, default: 0 },
  maxDownloads: { type: Number, default: 1 },
  lastDownloadDate: { type: Date },
  phoneNumber: { type: String, default: "" },
  otp: {
    code: { type: String },
    expiresAt: { type: Date },
  },
  otpVerified: { type: Boolean, default: false },
  state: { type: String, required: true },
  theme: { type: String, enum: ["dark", "light"], default: "dark" },
  joinedOn: { type: Date, default: Date.now },
});

// Simplify OTP handling
userschema.pre("save", function (next) {
  if (this.otp?.expiresAt && this.otp.expiresAt < new Date()) {
    this.otp = undefined; // Clear OTP if expired
  }
  next();
});

export default mongoose.model("User", userschema);
