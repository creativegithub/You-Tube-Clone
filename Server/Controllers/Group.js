import Group from "../Models/Group.js";
import mongoose from "mongoose";

export const creategroup = async (req, res) => {
  const { name, desc, members, creatorId } = req.body;

  // console.log("Create Group :- ", req.body);

  if (!name || !creatorId) {
    return res
      .status(400)
      .json({ message: "Group name and creator ID are required." });
  }

  try {
    // Attempt to create a new group
    const newGroup = new Group({ name, desc, members, creatorId });

    await newGroup.save();
    res.status(201).json(newGroup);
  } catch (error) {
    console.error("Error creating group:", error); // Log the error for debugging
    res
      .status(500)
      .json({ message: "Error creating group.", error: error.message });
  }
};

export const getallgroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ msg: "Server error while fetching groups." });
  }
};

export const getgroupbyname = async (req, res) => {
  const { name: groupName } = req.params;
  try {
    const group = await Group.findOne({ name: groupName }).populate("messages");
    if (!group) return res.status(404).json({ msg: "Group not found." });

    res.json({ messages: group.messages }); // Ensure this is an array
  } catch (error) {
    res.status(500).json({ msg: "Server error while fetching group." });
  }
};

export const deletegroup = async (req, res) => {
  const { name: groupName } = req.params;

  // console.log("DELETE GROUP :-", req.params);

  try {
    const group = await Group.findOneAndDelete({ name: groupName });
    if (!group) return res.status(404).json({ msg: "Group not found." });

    res.json({ msg: "Group deleted successfully." });
  } catch (error) {
    res.status(500).json({ msg: "Server error while deleting group." });
  }
};

export const addmember = async (req, res) => {
  // console.log("Add member route hit");
  const { name: groupName } = req.params;
  const { memberId } = req.body;

  // console.log("Group Name:", groupName, "Member ID:", memberId);

  if (!memberId) {
    return res.status(400).json({ message: "Member ID is required." });
  }

  try {
    const group = await Group.findOne({ name: groupName });

    if (!group) {
      return res.status(404).json({ message: "Group not found." });
    }

    // Check if the member is already in the group
    if (group.members.includes(memberId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of the group." });
    }

    group.members.push(memberId);
    await group.save();

    res.json({ message: "Member added successfully.", members: group.members });
  } catch (error) {
    console.error("Error adding member:", error);
    res.status(500).json({ error: "Error adding member." });
  }
};

export const getallmembers = async (req, res) => {
  // console.log("Get all members route hit");
  const { name: groupName } = req.params; // Use groupName for clarity
  try {
    const group = await Group.findOne({ name: groupName }).populate("members");
    if (!group) return res.status(404).json({ message: "Group not found." });

    res.json(group.members);
  } catch (error) {
    res.status(500).json({ error: "Error fetching group members." });
  }
};

export const sendmessage = async (req, res) => {
  const { name: groupName } = req.params; // Use groupName for clarity
  const { user, message } = req.body;

  try {
    const group = await Group.findOne({ name: groupName });
    if (!group) return res.status(404).json({ msg: "Group not found." });

    const newMessage = {
      user,
      message,
      timestamp: new Date(),
    };

    group.messages.push(newMessage);
    await group.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ msg: "Server error while sending message." });
  }
};

export const getmessages = async (req, res) => {
  const { name: groupName } = req.params; // Use groupName for clarity
  try {
    const group = await Group.findOne({ name: groupName });
    if (!group) return res.status(404).json({ msg: "Group not found." });

    res.status(200).json(group.messages);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching messages." });
  }
};

export const deletemessage = async (req, res) => {
  const { groupName, messageId } = req.params;

  // console.log(
  //   "Received DELETE request for group:",
  //   groupName,
  //   "messageId:",
  //   messageId
  // );

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    return res.status(400).json({ msg: "Message ID is not valid" });
  }

  try {
    const group = await Group.findOne({ name: groupName });
    if (!group) return res.status(404).json({ msg: "Group not found" });

    const messageIndex = group.messages.findIndex(
      (message) => message._id.toString() === messageId
    );

    if (messageIndex === -1)
      return res.status(404).json({ msg: "Message not found" });

    group.messages.splice(messageIndex, 1);
    await group.save();

    res.status(200).json(group.messages); // Return the updated list of messages
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ msg: "Server error while deleting message" });
  }
};
