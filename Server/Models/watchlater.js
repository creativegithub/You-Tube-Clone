import mongoose from "mongoose";

const watchlatervideoschema = mongoose.Schema({
  videoid: { type: String, required: true },
  viewer: { type: String, required: true },
  likedon: { type: Date, default: Date.now() },
});

export default mongoose.model("Watchlater", watchlatervideoschema);