import express from "express";
import { getAllPlans } from "../Controllers/Plan.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.get("/", auth, getAllPlans);

export default routes;
