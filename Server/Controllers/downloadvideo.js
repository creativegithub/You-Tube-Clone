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

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;

//   try {
//     const video = await Videofiles.findById(videoid);

//     console.log("Fetched video object:", video);

//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     // Use the filepath property directly instead of building it manually
//     const videoPath = path.join(__dirname, "../", video.filepath);

//     console.log(`Full video path: ${videoPath}`);

//     // Check if the file exists
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         console.error(`File not found: ${videoPath}`);
//         return res.status(404).json({ message: "Video file not found." });
//       }

//       // Send the video file for download
//       res.download(videoPath, (err) => {
//         if (err) {
//           console.error("Download error:", err);
//           return res.status(500).json({ message: "Failed to download video." });
//         }
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;
//   const { id: _id } = req.params;

//   console.log(req.params);

//   try {
//     const video = await Videofiles.findById(videoid);
//     const user = await User.findById(_id, { plan });
//     console.log("USer detai download videofile:-", user);
//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     // Check if it's a free plan and if the user has exceeded their download limit
//     if (user.plan === "Free") {
//       const today = new Date();
//       const lastDownloadDate = user.lastDownloadDate;
//       const isSameDay =
//         lastDownloadDate &&
//         lastDownloadDate.toDateString() === today.toDateString();

//       if (isSameDay && user.downloadCounts >= user.maxDownloads) {
//         return res.status(403).json({
//           message:
//             "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
//         });
//       }

//       // Increment download count for free users
//       user.downloadCounts += 1;
//       user.lastDownloadDate = today;
//       await user.save();
//     }

//     // Proceed to download the video
//     const videoPath = path.join(__dirname, "../", video.filepath);
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: "Video file not found." });
//       }
//       res.download(videoPath);
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;
//   const { id: _id } = req.params;

//   console.log("Request Params:", req.params);

//   try {
//     // Fetch the video and user data
//     const video = await Videofiles.findById(videoid);
//     const user = await User.findById(
//       _id,
//       "plan downloadCounts lastDownloadDate maxDownloads"
//     );

//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     console.log("User details for video download:", user);

//     // If the user's plan is "Free", check download limits
//     if (user.plan === "Free") {
//       const today = new Date();
//       const lastDownloadDate = user.lastDownloadDate;

//       // Ensure the date comparison works correctly (by comparing only the date part)
//       const isSameDay =
//         lastDownloadDate &&
//         lastDownloadDate.toDateString() === today.toDateString();

//       // If it's the same day and the user has exceeded their limit
//       if (isSameDay && user.downloadCounts >= user.maxDownloads) {
//         return res.status(403).json({
//           message:
//             "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
//         });
//       }

//       // Increment download count for free users
//       user.downloadCounts += 1;
//       user.lastDownloadDate = today;
//       await user.save();
//     }

//     // Proceed to download the video
//     const videoPath = path.join(__dirname, "../", video.filepath);

//     // Check if video file exists
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: "Video file not found." });
//       }
//       res.download(videoPath); // Initiates the download
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;
//   const { id: _id } = req.params;

//   console.log("Request Params:", req.params);

//   try {
//     // Fetch the video and user data
//     const video = await Videofiles.findById(videoid);
//     const user = await User.findById(
//       _id,
//       "plan downloadCounts lastDownloadDate maxDownloads"
//     );

//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     if (!user) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     console.log("User details for video download:", user);

//     // If the user's plan is "Free", check download limits
//     if (user.plan === "Free") {
//       const today = new Date();
//       const lastDownloadDate = user.lastDownloadDate;

//       // Ensure the date comparison works correctly (by comparing only the date part)
//       const isSameDay =
//         lastDownloadDate &&
//         lastDownloadDate.toDateString() === today.toDateString();

//       // If it's the same day and the user has exceeded their limit
//       if (isSameDay && user.downloadCounts >= user.maxDownloads) {
//         return res.status(403).json({
//           message:
//             "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
//         });
//       }

//       // Increment download count for free users
//       user.downloadCounts += 1;
//       user.lastDownloadDate = today;

//       // Save user data and check for errors
//       const updatedUser = await user.save();

//       // Log and verify if the save was successful
//       if (!updatedUser) {
//         return res.status(500).json({ message: "Failed to update user data." });
//       }

//       console.log(
//         "User download count updated successfully:",
//         updatedUser.downloadCounts
//       );
//     }

//     // Proceed to download the video
//     const videoPath = path.join(__dirname, "../", video.filepath);

//     // Check if video file exists
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: "Video file not found." });
//       }
//       res.download(videoPath); // Initiates the download
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;
//   const { id: _id } = req.params;

//   console.log(req.params);

//   try {
//     const video = await Videofiles.findById(videoid);
//     const user = await User.findById(_id);

//     console.log("User details for download video: ", user);

//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     // Check if it's a free plan and if the user has exceeded their download limit
//     if (user.plan === "Free") {
//       const today = new Date();
//       const lastDownloadDate = user.lastDownloadDate;
//       const isSameDay =
//         lastDownloadDate &&
//         lastDownloadDate.toDateString() === today.toDateString();

//       if (isSameDay && user.downloadCounts >= user.maxDownloads) {
//         return res.status(403).json({
//           message:
//             "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
//         });
//       }

//       // Increment download count for free users
//       user.downloadCounts += 1;
//       user.lastDownloadDate = today;
//       await user.save();
//     }

//     const videoPath = path.join(__dirname, "../", video.filepath);
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: "Video file not found." });
//       }
//       res.download(videoPath);
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

// export const downloadVideoFile = async (req, res) => {
//   const { videoid } = req.params;
//   const { id: _id } = req.params;

//   try {
//     const video = await Videofiles.findById(videoid);
//     const user = await User.findById(_id);

//     if (!video) {
//       return res.status(404).json({ message: "Video not found." });
//     }

//     // Check if it's a free plan and if the user has exceeded their download limit
//     if (user.plan === "Free") {
//       const today = new Date();
//       const lastDownloadDate = user.lastDownloadDate;
//       const isSameDay =
//         lastDownloadDate &&
//         lastDownloadDate.toDateString() === today.toDateString();

//       if (isSameDay && user.downloadCounts >= user.maxDownloads) {
//         return res.status(403).json({
//           message:
//             "You have reached your download limit for today. Upgrade to Gold for unlimited downloads.",
//         });
//       }

//       // Increment download count for free users
//       user.downloadCounts += 1;
//       user.lastDownloadDate = today;
//       await user.save();
//     }

//     // Construct the file path
//     const videoPath = path.join(__dirname, "../", video.filepath);

//     // Stream the video file to the client
//     fs.access(videoPath, fs.constants.F_OK, (err) => {
//       if (err) {
//         return res.status(404).json({ message: "Video file not found." });
//       }

//       const videoStream = fs.createReadStream(videoPath);
//       res.setHeader("Content-Type", "video/mp4"); // Adjust MIME type as needed
//       videoStream.pipe(res);
//       videoStream.on("error", (err) => {
//         console.error("Stream error:", err);
//         res.status(500).json({ message: "Error streaming video." });
//       });
//     });
//   } catch (error) {
//     console.error("Error fetching video:", error);
//     res.status(500).json({ message: "Internal Server Error." });
//   }
// };

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
