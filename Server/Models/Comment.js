import mongoose from "mongoose";

const commentschema = mongoose.Schema({
  commentBody: { type: String, required: true },
  translatedComment: { type: String, required: true },
  originalLanguage: { type: String, required: true },
  userId: { type: String, required: true },
  userCommented: { type: String, required: true },
  videoid: { type: String, required: true },
  city: { type: String, default: "Unknown" },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: [String], default: [] },
  likedBy: { type: [String], default: [] },
  commentedon: { type: Date, default: new Date() },
});

export default mongoose.model("Comment", commentschema);
