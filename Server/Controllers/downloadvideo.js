import User from "../Models/Auth.js";
import Downloadvideo from "../Models/downloadvideo.js";
import Videofiles from "../Models/videofile.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const downloadedVideoController = async (req, res) => {
  const downloadvideodata = req.body;
  const addToDownloadedVideo = new Downloadvideo(downloadvideodata);

  try {
    await addToDownloadedVideo.save();
    res.status(200).json("Added to downloaded videos");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const downloadVideoFile = async (req, res) => {
  const { videoid } = req.params;
  const { id: _id } = req.params;

  // console.log(
  //   "Received request for download with userId:",
  //   _id,
  //   "and videoId:",
  //   videoid
  // );

  // console.log("Request Params:", req.params);

  try {
    // Fetch the video and user data
    const video = await Videofiles.findById(videoid);
    const user = await User.findById(_id);

    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // console.log("User details for video download:", user);

    // If the user's plan is "Free", check download limits
    if (user.plan === "Free") {
      const today = new Date();
      const lastDownloadDate = user.lastDownloadDate;

      // If it's a new day, reset the download count
      if (
        lastDownloadDate &&
        lastDownloadDate.toDateString() !== today.toDateString()
      ) {
        user.downloadCounts = 0;
      }

      // Ensure the date comparison works correctly (by comparing only the date part)
      const isSameDay =
        lastDownloadDate &&
        lastDownloadDate.toDateString() === today.toDateString();

      // If it's the same day and the user has exceeded their limit
      if (isSameDay && user.downloadCounts >= user.maxDownloads) {
        return res.status(403).json({
          message:
            "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
        });
      }

      // Increment download count for free users
      user.downloadCounts += 1;
      user.lastDownloadDate = today;

      // Save the updated user data
      await user.save();
    }

    // Proceed to download the video
    const videoPath = path.join(__dirname, "../", video.filepath);

    // Check if video file exists
    fs.access(videoPath, fs.constants.F_OK, (err) => {
      if (err) {
        return res.status(404).json({ message: "Video file not found." });
      }
      res.download(videoPath); // Initiates the download
    });
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({ message: "Internal Server Error." });
  }
};

export const getAllDownloadedVideoController = async (req, res) => {
  try {
    const files = await Downloadvideo.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deleteDownloadedVideo = async (req, res) => {
  const { videoid, viewer } = req.params;

  try {
    await Downloadvideo.findOneAndDelete({
      videoid: videoid,
      viewer: viewer,
    });
    res.status(200).json({ message: "Removed from watch later" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
