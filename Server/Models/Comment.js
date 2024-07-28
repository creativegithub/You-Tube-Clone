import mongoose from "mongoose";

const commentschema = mongoose.Schema({
  videoid: String,
  userId: String,
  commentBody: String,
  userCommented: String,
  commentedon: { type: Date, default: Date.now },
});

export default mongoose.model("Comments", commentschema);
