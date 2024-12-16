import express from "express";
import {
  creategroup,
  deletegroup,
  getallgroups,
  getgroupbyname,
  addmember,
  getmessages,
  sendmessage,
  getallmembers,
  deletemessage,
} from "../Controllers/Group.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/create", auth, creategroup);
routes.get("/", auth, getallgroups);
routes.get("/:name", auth, getgroupbyname);
routes.delete("/:name", auth, deletegroup);
routes.post("/:name/add-member", auth, addmember);
routes.get("/:name/members", auth, getallmembers);
routes.post("/:name/sendmessage", auth, sendmessage);
routes.get("/:name/messages", auth, getmessages);
routes.delete("/:name/delete/:messageId", auth, deletemessage);

export default routes;
