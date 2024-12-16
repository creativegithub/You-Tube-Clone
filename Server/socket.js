import express from "express";
import { Server } from "socket.io";
import http from "http";
import Group from "./Models/Group.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("joinGroup", async (groupName) => {
    try {
      const group = await Group.findOne({ name: groupName });
      if (group) {
        socket.emit("existingMessages", group.messages);
        socket.join(groupName); // Join the socket to the room
      } else {
        socket.emit("groupNotFound", `Group ${groupName} not found.`);
      }
    } catch (error) {
      console.error("Error fetching group:", error);
    }
  });

  // Handle sending messages
  socket.on("sendMessage", async (messageData) => {
    const { groupName, user, message } = messageData;
    try {
      const group = await Group.findOne({ name: groupName });
      if (group) {
        const newMessage = await group.addMessage({ user, message });
        io.to(groupName).emit("receiveMessage", newMessage);
      }
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  // WebRTC signaling
  socket.on("startCall", (callerId, callerName) => {
    console.log(`${callerName} has started a call.`);
    socket.broadcast.emit("userLiveNotification", `${callerName} is now live!`);
  });

  socket.on("offer", (offer) => {
    socket.broadcast.emit("offer", offer);
  });

  socket.on("answer", (answer) => {
    socket.broadcast.emit("answer", answer);
  });

  socket.on("ice-candidate", (candidate) => {
    socket.broadcast.emit("ice-candidate", candidate);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export default io;
