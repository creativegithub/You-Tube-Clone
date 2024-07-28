import mongoose from "mongoose";
import Comment from "../Models/Comment.js";

export const postcomment = async (req, res) => {
  const commentdata = req.body;
  const postcomment = new Comment(commentdata);

  try {
    await postcomment.save();
    res.status(200).json("Posted the comment");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const getallcomment = async (req, res) => {
  try {
    const commentList = await Comment.find();
    res.status(200).send(commentList);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Channel unavailable...");
  }

  try {
    await Comment.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted comment" });
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;

  const { commentBody } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comments unavailable...");
  }

  try {
    const updatecomment = await Comment.findByIdAndUpdate(
      _id,
      {
        $set: {
          commentBody: commentBody,
        },
      },
      { new: true }
    );
  } catch (error) {
    res.status(400).json(error.message);
    return;
  }
};
