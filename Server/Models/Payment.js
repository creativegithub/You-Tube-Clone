  import mongoose from "mongoose";

  const paymentSchema = mongoose.Schema({
    userId: { type: String, required: true },
    plan: { type: Object, required: true },
    invoice: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    status: { type: String, enum: ["pending", "confirmed"], default: "pending" },
    createdAt: { type: Date, default: Date.now },
  });

  export default mongoose.model("Payment", paymentSchema);
