import mongoose from "mongoose";
import User from "../Models/Auth.js";

export const updatechanneldata = async (req, res) => {
  const { id: _id } = req.params;
  const { name, desc } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Channel unavailable...");
  }
  try {
    const updatedata = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          name: name,
          desc: desc,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedata);
  } catch (error) {
    res.status(405).json({ message: error.message });
    return;
  }
};

export const getallchannels = async (req, res) => {
  try {
    const allchannels = await User.find();
    const allchanneldata = [];
    allchannels.forEach((channel) => {
      allchanneldata.push({
        _id: channel._id,
        name: channel.name,
        email: channel.email,
        desc: channel.desc,
      });
    });
    res.status(200).json(allchanneldata);
  } catch (error) {
    res.status(405).json({ message: error.message });
    return;
  }
};
