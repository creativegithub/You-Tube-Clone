import express from "express";
import { likevideocontroller } from "../Controllers/like.js";
import { viewscontroller } from "../Controllers/views.js";
import { uploadvideo, getallvideos } from "../Controllers/video.js";
import {
  historycontroller,
  deletehistory,
  getallhistorycontroller,
} from "../Controllers/History.js";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";
import {
  watchlatercontroller,
  getallwatchlatercontroller,
  deletewatchlater,
} from "../Controllers/watchlater.js";
import {
  getalllikedvideocontroller,
  likedvideocontroller,
  deletelikedvideo,
} from "../Controllers/likedvideo.js";

const routes = express.Router();

routes.post("/uploadvideo", auth, upload.single("file"), uploadvideo);

routes.get("/getvideos", getallvideos);

routes.patch("/like/:id", auth, likevideocontroller);

routes.patch("/view/:id", viewscontroller);

routes.post("/history", auth, historycontroller);

routes.get("/getallhistory", getallhistorycontroller);

routes.delete("/deletehistory/:userId", auth, deletehistory);

routes.post("/watchlater", auth, watchlatercontroller);

routes.get("/getallwatchlater", getallwatchlatercontroller);

routes.delete("/deletewatchlater/:userId", auth, deletewatchlater);

routes.post("/likedvideo", auth, likedvideocontroller);

routes.get("/getalllikedvideo", getalllikedvideocontroller);

routes.delete("deletelikedvideo/:videoid/:viewer", auth, deletelikedvideo);

export default routes;
