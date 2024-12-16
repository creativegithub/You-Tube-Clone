import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  video: { type: String, required: true },
  maxDownloads: { type: Number, required: true },
});

export default mongoose.model("Plan", planSchema);
