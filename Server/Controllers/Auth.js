import User from "../Models/Auth.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = twilio(accountSid, authToken);

// Email transporter configuration
const sendEmail = async (email, otpCode) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otpCode}`,
  });
};

// Allowed States for email OTP
const allowedStates = [
  "Tamil Nadu",
  "Kerala",
  "Karnataka",
  "Andhra Pradesh",
  "Telangana",
];

// Check if the current time is in the light theme timeframe
const isLightThemeTime = (currentHour) => currentHour >= 10 && currentHour < 12;

const fetchCityAndState = async (latitude, longitude) => {
  const apiKey = process.env.OPENCAGE_API_KEY;
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
    latitude
  )},${encodeURIComponent(longitude)}&key=${apiKey}&language=en`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return {
      city:
        data.results[0]?.components?.city ||
        data.results[0]?.components?._noramlize_city ||
        data.results[0]?.components?.county ||
        "Unknown",
      state: data.results[0]?.components?.state || "Unknown",
    };
  } catch (error) {
    console.error("Error fetching city:", error);
    return { city: "Unknown", state: "Unknown" };
  }
};

export const login = async (req, res) => {
  const { email, name, latitude, longitude } = req.body;

  try {
    const { city, state } = await fetchCityAndState(latitude, longitude);
    const currentHour = new Date().getHours();
    const isLightTheme =
      isLightThemeTime(currentHour) && allowedStates.includes(state);

    // Check if user already exists
    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      existingUser = new User({
        email,
        name,
        city,
        state,
        theme: isLightTheme ? "light" : "dark",
      });
      await existingUser.save();
    }

    existingUser.theme = isLightTheme ? "light" : "dark";
    await existingUser.save();

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Check if user has a phone number
    if (!existingUser.phoneNumber) {
      return res.status(200).json({
        result: existingUser,
        token,
        message: "Login successful. Please update your phone number.",
        requiresPhoneNumber: true,
        otpSentViaEmail: false, // No OTP sent
      });
    }

    // Send OTP
    const otpResponse = await sendOtp(existingUser.phoneNumber, email, state);

    // console.log("SEND OTP RESPONSE :-", otpResponse);

    // Indicate if OTP was successfully sent via email or SMS
    return res.status(200).json({
      result: existingUser,
      token,
      message: "Login successful. OTP sent!",
      otpSentViaEmail: allowedStates.includes(state), // Check if OTP was sent via email
    });
  } catch (error) {
    console.error("Error in Login:", error);
    return res.status(500).json({ message: "Something went wrong..." });
  }
};

// Function to generate OTP
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    code: otp,
    expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  };
};

// Send OTP Function
export const sendOtp = async (phoneNumber, email, state) => {
  try {
    if (!phoneNumber || !email || !state) {
      throw new Error("Phone number, email, and state are required.");
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) throw new Error("User not found.");

    const otpData = generateOtp();
    existingUser.otp = otpData;
    existingUser.otpVerified = false;
    await existingUser.save();

    // Send OTP based on allowed states
    if (!allowedStates.includes(state)) {
      // Send OTP via SMS for non-allowed states
      const message = await twilioClient.messages.create({
        body: `Your OTP is ${otpData.code}. It will expire in 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
        to: phoneNumber,
      });

      // console.log("Twilio SMS Response:", message);
    } else {
      // Send OTP via Email for allowed states
      await sendEmail(email, otpData.code);
    }

    return true; // OTP sent successfully
  } catch (error) {
    console.error("Error sending OTP:", error.message);
    throw new Error("An error occurred while sending the OTP.");
  }
};

// Verify OTP Function
export const verifyOtp = async (req, res) => {
  const { phoneNumber, email, otp } = req.body;

  // console.log("Verify OTP:", req.body);

  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required." });
  }

  try {
    const existingUser = await User.findOne({ phoneNumber });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the OTP matches
    if (
      existingUser.otp.code === otp &&
      existingUser.otp.expiresAt > new Date()
    ) {
      existingUser.otpVerified = true; // Mark as OTP Verified
      existingUser.otp = undefined; // Clear OTP after verification
      await existingUser.save();

      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "OTP verified successfully",
        token,
        result: existingUser,
      });
    } else {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
  } catch (error) {
    return res.status(500).json({ message: "OTP verification failed" });
  }
};

// Update Phone Number Function
export const updatePhoneNumber = async (req, res) => {
  const { id: _id } = req.params;
  const { phoneNumber } = req.body;

  // console.log("Update Phone Number:", _id, "Phone Number:", phoneNumber);

  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    // Update the user's phone number
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { phoneNumber },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate OTP and save it
    const otpData = generateOtp();
    updatedUser.otp = otpData;
    updatedUser.otpVerified = false;
    await updatedUser.save();

    // Send OTP via Twilio SMS
    await twilioClient.messages.create({
      body: `Your OTP is ${otpData.code}. It will expire in 10 minutes.`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phoneNumber,
    });

    return res.status(200).json({
      updatedUser,
      message: "Phone number updated successfully and OTP sent.",
    });
  } catch (error) {
    if (error.code === 21608) {
      // Twilio error for unverified numbers
      return res.status(400).json({
        message:
          "The phone number you entered is unverified. Please verify it in your Twilio account or purchase a new Twilio number. If you'd like to explore the features of the website, click 'Ok' to proceed with limited access. This option is available only once.",
      });
    } else {
      // General error handling
      return res
        .status(500)
        .json({ message: "Error updating phone number: " + error.message });
    }
  }
};

// Update User City Function
export const updateUserCity = async (req, res) => {
  const { id: _id } = req.params;
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude are required." });
  }

  try {
    const { city, state } = await fetchCityAndState(latitude, longitude);
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { city, state },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ result: updatedUser });
  } catch (error) {
    console.error("Error updating city:", error);
    return res.status(500).json({ message: "Failed to update user city." });
  }
};
