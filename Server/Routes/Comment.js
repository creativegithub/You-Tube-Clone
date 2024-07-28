import express from "express";
import {
  postcomment,
  getallcomment,
  deletecomment,
  editcomment,
} from "../Controllers/Comment.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/post", auth, postcomment);

routes.get("/get", getallcomment);

routes.delete("/delete/:id", auth, deletecomment);

routes.patch("/edit/:id", auth, editcomment);

export default routes;
