import express from "express";
import {
  createOrder,
  processPayment,
  verifyPayment,
} from "../Controllers/Payment.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/payment-process/:userId", auth, processPayment);
routes.post("/create-order/:userId", auth, createOrder);
routes.post("/verify-payment", auth, verifyPayment);

export default routes;
