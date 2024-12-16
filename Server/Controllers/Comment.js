import mongoose from "mongoose";
import Comment from "../Models/Comment.js";
import fetch from "node-fetch"; // Make sure to install this package

const isValidComment = (comment) => {
  const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  return !specialCharRegex.test(comment);
};

async function translateText(text, originalLanguage, targetLanguage) {
  const translationResponse = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=${originalLanguage}|${targetLanguage}&key=${
      process.env.MYMEMORY_API_KEY
    }`
  );

  if (!translationResponse.ok) throw new Error("Translation API error");

  const translatedData = await translationResponse.json();
  return translatedData.responseData.translatedText || text;
}

export const postcomment = async (req, res) => {
  const {
    commentBody,
    userId,
    userCommented,
    videoid,
    city,
    originalLanguage,
  } = req.body;

  if (!commentBody || !isValidComment(commentBody)) {
    return res
      .status(400)
      .json({ error: "Invalid comment. No special characters allowed." });
  }

  try {
    const translatedComment = await translateText(
      commentBody,
      originalLanguage,
      "en"
    );

    const newComment = new Comment({
      commentBody,
      userId,
      userCommented,
      videoid,
      city,
      originalLanguage,
      translatedComment,
    });

    await newComment.save();
    res.status(200).json(newComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getallcomment = async (req, res) => {
  try {
    const commentList = await Comment.find();
    res.status(200).send(commentList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletecomment = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comment unavailable...");
  }

  try {
    await Comment.findByIdAndDelete(_id);
    res.status(200).json({ message: "Deleted comment" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const editcomment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comment unavailable...");
  }

  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      _id,
      { $set: { commentBody } },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const likeDislikeComment = async (req, res) => {
  const { action, userLanguage } = req.body;
  const { id: _id } = req.params;
  const userId = req.userid;

  if (!action || !["like", "dislike"].includes(action)) {
    return res
      .status(400)
      .json({ error: 'Action must be "like" or "dislike"' });
  }

  try {
    const comment = await Comment.findById(_id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    let updateFields = {};
    if (action === "like") {
      if (comment.likedBy.includes(userId)) {
        updateFields.likes = comment.likes - 1;
        updateFields.likedBy = comment.likedBy.filter((id) => id !== userId);
      } else {
        if (comment.dislikedBy.includes(userId)) {
          updateFields.dislikes = comment.dislikes - 1;
          updateFields.dislikedBy = comment.dislikedBy.filter(
            (id) => id !== userId
          );
        }
        updateFields.likes = comment.likes + 1;
        updateFields.likedBy = [...comment.likedBy, userId];
      }
    } else if (action === "dislike") {
      if (comment.dislikedBy.includes(userId)) {
        updateFields.dislikes = comment.dislikes - 1;
        updateFields.dislikedBy = comment.dislikedBy.filter(
          (id) => id !== userId
        );
      } else {
        if (comment.likedBy.includes(userId)) {
          updateFields.likes = comment.likes - 1;
          updateFields.likedBy = comment.likedBy.filter((id) => id !== userId);
        }
        updateFields.dislikes = comment.dislikes + 1;
        updateFields.dislikedBy = [...comment.dislikedBy, userId];
      }
    }

    const updatedComment = await Comment.findOneAndUpdate(
      { _id },
      { $set: updateFields },
      { new: true }
    );

    // Automatically remove the comment if it gets 2 dislikes
    if (updatedComment?.dislikes >= 2) {
      await Comment.findByIdAndDelete(_id);
      return res
        .status(200)
        .json({ message: "Comment removed due to excessive dislikes." });
    }

    if (!updatedComment)
      return res.status(404).json({ error: "Comment not found" });

    // Translate the updated comment if needed
    updatedComment.translatedComment = await translateText(
      updatedComment.commentBody,
      updatedComment.originalLanguage,
      userLanguage
    );

    res.status(200).json(updatedComment);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

// Fetch Comments in Target Language
export const translateComment = async (req, res) => {
  const { id: _id } = req.params;
  const { targetLanguage, originalLanguage } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).send("Comment unavailable...");
  }

  try {
    const comment = await Comment.findById(_id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    const translatedComment = await translateText(
      comment.commentBody,
      comment.originalLanguage,
      targetLanguage
    );
    res.status(200).json({ translatedComment });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};
