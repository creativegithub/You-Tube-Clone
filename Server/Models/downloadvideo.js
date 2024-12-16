import mongoose from "mongoose";

const downloadvideoschema = mongoose.Schema({
  videoid: { type: String, required: true },
  viewer: { type: String, required: true },
  downloadedon: { type: Date, default: Date.now },
});

export default mongoose.model("Downloadvideo", downloadvideoschema);
