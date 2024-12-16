import express from "express";
import {
  login,
  sendOtp,
  updatePhoneNumber,
  updateUserCity,
  verifyOtp,
} from "../Controllers/Auth.js";
import { updatechanneldata, getallchannels } from "../Controllers/channel.js";
import { updateUserPlan } from "../Controllers/Plan.js";

const routes = express.Router();

routes.post("/login", login);

routes.post("/update-phone/:id", updatePhoneNumber);

routes.post("/send-otp", sendOtp);

routes.post("/verify-otp", verifyOtp);

routes.post("/update-city/:id", updateUserCity);

routes.post("/update-plan/:id", updateUserPlan);

routes.patch("/update/:id", updatechanneldata);

routes.get("/getallchannel", getallchannels);

export default routes;
