import express from "express";
import { savePaymentMethod } from "../Controllers/Paymentmethod.js";
import auth from "../middleware/auth.js";

const routes = express.Router();

routes.post("/save-payment-method/:userId", auth, savePaymentMethod);

export default routes;
