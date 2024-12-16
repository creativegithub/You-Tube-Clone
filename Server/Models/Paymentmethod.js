import mongoose from "mongoose";

const paymentMethodSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    cardDetails: {
      cardNumber: String,
      cardholderName: String,
      expiryDate: String,
      cvv: String,
    },
    atmNumber: { type: String },
    upiId: { type: String },
    accountNumber: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Paymentmethod", paymentMethodSchema);
