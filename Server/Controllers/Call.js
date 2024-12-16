import Call from "../Models/Call.js";
import io from "../socket.js";

export const startCall = async (req, res) => {
  const { callerId, callerName } = req.body;
  const newCall = new Call({ callerId, callerName });
  await newCall.save();
  // Notify other clients that the caller is live
  io.emit("callerLive", { callerId, callerName });
  // console.log(`${callerName} is now live, emitting callerLive event.`);
  res.status(201).json(newCall);
};

export const endCall = async (req, res) => {
  const { id } = req.params;
  const { recordingUrl } = req.body;

  const call = await Call.findByIdAndUpdate(
    id,
    { endTime: Date.now(), recordingUrl },
    { new: true }
  );
  res.status(200).json(call);
};

export const getCalls = async (req, res) => {
  const calls = await Call.find();
  res.status(200).json(calls);
};

export const joinCall = async (req, res) => {
  const { callerId: callerId } = req.params;
  const { userId } = req.body;
  await Call.findByIdAndUpdate(callerId, {
    $addToSet: { joinedCaller: userId },
  });
  res.status(200).send("User joined the call successfully.");
};
