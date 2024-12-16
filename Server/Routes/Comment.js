import express from "express";
import {
  postcomment,
  getallcomment,
  deletecomment,
  editcomment,
  likeDislikeComment,
  translateComment,
} from "../Controllers/Comment.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/post", auth, postcomment);

routes.get("/get", getallcomment);

routes.delete("/:id/delete", auth, deletecomment);

routes.patch("/:id/edit", auth, editcomment);

routes.post("/:id/likeDislike/:action", auth, likeDislikeComment);

routes.post("/:id/translate", auth, translateComment);

export default routes;
