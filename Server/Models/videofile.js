import mongoose from "mongoose";

const videofileschema = new mongoose.Schema(
  {
    videotitle: {
      type: String,
      require: true,
    },
    filename: {
      type: String,
      require: true,
    },
    filetype: {
      type: String,
      require: true,
    },
    filepath: {
      type: String,
      require: true,
    },
    filesize: {
      type: String,
      require: true,
    },
    videochannel: {
      type: String,
      require: true,
    },
    Like: {
      type: Number,
      default: 0,
    },
    views: {
      type: Number,
      default: 0,
    },
    uploader: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Videofiles", videofileschema);
