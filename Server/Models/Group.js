import mongoose from "mongoose";

// Message schema for individual chat messages
const messageSchema = mongoose.Schema({
  user: { type: String, required: true },
  message: { type: String, required: true, minlength: 1, maxlength: 500 },
  timestamp: { type: Date, default: Date.now },
});

// Group schema
const groupSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, index: true },
    desc: { type: String, maxlength: 500 },
    creatorId: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [messageSchema],
  },
  { timestamps: true }
);

// Method to add a message to the group
groupSchema.methods.addMessage = async function (user, messageContent) {
  if (!user || !messageContent) {
    throw new Error("User and message content are required.");
  }

  const message = { user, message: messageContent };
  this.messages.push(message);
  return await this.save();
};

// Method to add a member to the group
groupSchema.methods.addMember = async function (userId) {
  if (!this.members.includes(userId)) {
    this.members.push(userId);
  }
  return await this.save();
};

export default mongoose.model("Group", groupSchema);
