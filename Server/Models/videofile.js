import mongoose from "mongoose";

const videofileschema = mongoose.Schema(
  {
    videotitle: {
      type: String,
      required: true,
      trim: true,
    },
    filename: {
      type: String,
      required: true,
      trim: true,
    },
    filetype: {
      type: String,
      required: true,
      enum: ["video/mp4", "video/webm", "video/ogg"],
    },
    filepath: {
      type: String,
      required: true,
    },
    filesize: {
      type: Number,
      required: true,
    },
    videochannel: {
      type: String,
      required: true,
      trim: true,
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
      required: true,
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
