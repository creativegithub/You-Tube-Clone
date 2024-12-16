import mongoose from "mongoose";
import Videofiles from "../Models/videofile.js";

export const viewscontroller = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send("Video unvailable...");
  }

  try {
    const files = await Videofiles.findById(_id);
    const Views = files.views;
    const updateview = await Videofiles.findByIdAndUpdate(_id, {
      $set: {
        views: Views + 1,
      },
    });
    res.status(200).json(updateview);
  } catch (error) {
    res.status(400).json("error", error);
  }
};
