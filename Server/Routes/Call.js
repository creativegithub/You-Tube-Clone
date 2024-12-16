import express from "express";
import { endCall, getCalls, joinCall, startCall } from "../Controllers/Call.js";

const routes = express.Router();

routes.post("/", startCall);
routes.put("/:id", endCall);
routes.get("/", getCalls);
routes.post("/join", joinCall);

export default routes;
