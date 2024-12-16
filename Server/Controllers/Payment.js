import Payment from "../Models/Payment.js";
import User from "../Models/Auth.js";
import nodemailer from "nodemailer";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const sendEmail = async (email, userName, plan, invoice) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Check the plan and invoice data
  // console.log("Plan details:", plan);
  // console.log("Invoice:", invoice);
  const formatDuration = (duration) => {
    return duration === 9999999999 ? "Unlimited" : duration; // Transform large number to infinity symbol
  };
  // Mail options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Payment Confirmation - ${plan.name} Plan`,
    text: `Dear ${userName},\n\n
    Thank you for purchasing the ${
      plan.name
    } Plan! We are pleased to inform you that your payment has been successfully processed.\n\n
    Below are the details of your plan:\n
      -  Invoice Number : ${invoice}\n
     -  Plan Name : ${plan.name}\n
     -  Duration : ${formatDuration(plan.duration)} minutes\n
      -  Amount : ₹${plan.price}\n
      -  Max Downloads : ${formatDuration(plan.maxDownloads)}\n\n
    If you have any questions or require further assistance, please don't hesitate to reach out to us.\n\n
    Best regards,\n
    The YouTube Clone Team`,
  };

  // console.log("Sending email with the following details:", mailOptions);

  try {
    await transporter.sendMail(mailOptions);
    // console.log("Email sent successfully");
  } catch (error) {
    console.error("Failed to send email:", error.message);
    console.error("Stack Trace:", error.stack);
    throw new Error("Failed to send email");
  }
};

export const processPayment = async (req, res) => {
  const { userId } = req.params;
  const { plan, paymentMethod, invoice } = req.body;

  if (!plan || !paymentMethod) {
    return res
      .status(400)
      .json({ message: "Plan and payment method are required." });
  }

  try {
    const payment = await Payment.create({
      userId,
      plan: plan.name || plan._id,
      invoice: `ORDER_${new Date().getTime()}`,
      paymentMethod,
      status: "pending",
    });

    // Ensure user exists before updating
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // If Gold plan, set maxDownloads to unlimited (or a very high number)
    const updatedPlan =
      plan.name === "Gold"
        ? { plan: plan.name, maxDownloads: Infinity }
        : { plan: plan.name, maxDownloads: plan.maxDownloads };
    await User.findByIdAndUpdate(userId, updatedPlan, { new: true });

    await sendEmail(user.email, user.name, plan, payment.invoice);
    res.status(200).json({ message: "Payment details received.", payment });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your payment." });
  }
};

// Create a Razorpay order
export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Amount in paisa
    currency: "INR",
    receipt: `receipt_${new Date().getTime()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Verify Razorpay payment
export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const key_secret = process.env.RAZORPAY_SECRET; // Razorpay secret key

  // Generate the signature hash
  const generatedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Validate the signature
  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ message: "Invalid signature" });
  }

  // If valid, update the user's plan using the payment data
  const { userId, plan } = req.body; // Ensure plan info is included in the request body.

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { plan: plan.name, maxDownloads: plan.maxDownloads },
      { new: true }
    );

    // Optionally, update the payment record to "completed"
    await Payment.findOneAndUpdate(
      { invoice: `ORDER_${new Date().getTime() - 1}` }, // Find the last invoice
      { status: "completed" },
      { new: true }
    );

    res.status(200).json({
      message: "Payment verified and user upgraded to Premium",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error processing payment verification:", error);
    return res
      .status(500)
      .json({ message: "Error updating user plan after payment." });
  }
};
