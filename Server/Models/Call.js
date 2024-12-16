import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  callerId: { type: String, required: true },
  callerName: { type: String, required: true },
  joinedCaller: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  recordingUrl: { type: String },
});

export default mongoose.model("Call", callSchema);
