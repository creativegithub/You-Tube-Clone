import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, updatePhoneNumber, verifyOtp } from "../../action/auth";
import "./SignIn.css";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [showOtpVerify, setShowOtpVerify] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");

  const authUser = useSelector((state) => state.authreducer.data);
  const currentuser = useSelector((state) => state.currentuserreducer); // Get the user data from redux

  // console.log("Authreducerdata :- ", authUser);
  // console.log("Currentuser :- ", currentuser);

  const countryCodes = [
    { code: "+1", country: "US" },
    { code: "+20", country: "EG" },
    { code: "+27", country: "ZA" },
    { code: "+30", country: "GR" },
    { code: "+31", country: "NL" },
    { code: "+32", country: "BE" },
    { code: "+33", country: "FR" },
    { code: "+34", country: "ES" },
    { code: "+36", country: "HU" },
    { code: "+39", country: "IT" },
    { code: "+40", country: "RO" },
    { code: "+41", country: "CH" },
    { code: "+42", country: "CZ" },
    { code: "+43", country: "AT" },
    { code: "+44", country: "GB" },
    { code: "+45", country: "DK" },
    { code: "+46", country: "SE" },
    { code: "+47", country: "NO" },
    { code: "+48", country: "PL" },
    { code: "+49", country: "DE" },
    { code: "+50", country: "FK" },
    { code: "+51", country: "PE" },
    { code: "+52", country: "MX" },
    { code: "+53", country: "CU" },
    { code: "+54", country: "AR" },
    { code: "+55", country: "BR" },
    { code: "+56", country: "CL" },
    { code: "+57", country: "CO" },
    { code: "+58", country: "VE" },
    { code: "+59", country: "GY" },
    { code: "+60", country: "MY" },
    { code: "+61", country: "AU" },
    { code: "+62", country: "ID" },
    { code: "+63", country: "PH" },
    { code: "+64", country: "NZ" },
    { code: "+65", country: "SG" },
    { code: "+66", country: "TH" },
    { code: "+7", country: "RU" },
    { code: "+81", country: "JP" },
    { code: "+82", country: "KR" },
    { code: "+84", country: "VN" },
    { code: "+86", country: "CN" },
    { code: "+90", country: "TR" },
    { code: "+91", country: "IN" },
    { code: "+92", country: "PK" },
    { code: "+93", country: "AF" },
    { code: "+94", country: "LK" },
    { code: "+95", country: "MM" },
    { code: "+98", country: "IR" },
  ];

  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenResponse.access_token}`
        );
        const profile = res.data;
        const loginResponse = await dispatch(
          login({ email: profile.email, name: profile.name })
        );

        // Check if OTP was sent directly after login
        if (loginResponse?.payload?.otpSentViaEmail) {
          // Show the OTP verification section if OTP was sent via email
          setShowOtpVerify(true);
          setShowPhoneInput(false);
        }
      } catch (error) {
        console.error("Failed to fetch user data from Google", error);
      }
    },
    onError: (error) => {
      console.error("Login Failed", error);
    },
  });

  useEffect(() => {
    if (currentuser && currentuser.result) {
      if (currentuser.result.phoneNumber) {
        // User already has a phone number, show OTP verification section
        setShowOtpVerify(true);
        setShowPhoneInput(false);
      } else {
        // No phone number found, show phone input section
        setShowPhoneInput(true);
        setShowOtpVerify(false);
      }
    }
  }, [currentuser]);

  const handlePhoneNumberSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const fullPhoneNumber = countryCode + phoneNumber;
    try {
      // Update the phone number in the backend
      await dispatch(
        updatePhoneNumber(currentuser.result._id, fullPhoneNumber)
      );
      alert("Phone number updated successfully!");

      // console.log("Current User after update: ", currentuser);

      // Show OTP verification section after updating phone number
      setShowOtpVerify(true);
      setShowPhoneInput(false);
    } catch (error) {
      alert(
        "Failed to update phone number:" +
          (error.response?.data.message || "Unknown error")
      );
      setTimeout(() => {
        // Redirect to a specific webpage after the user clicks "OK"
        navigate("/"); // You can replace "/error-page" with your desired route
      }, 1000);
    }
  };

  const handleOtpVerification = async () => {
    const fullPhoneNumber =
      authUser.phoneNumber || currentuser.result.phoneNumber;
    try {
      const response = await dispatch(
        verifyOtp({
          phoneNumber: fullPhoneNumber,
          email: currentuser.result.email,
          otp: enteredOtp,
        })
      );

      if (response && response.token) {
        alert("OTP verified successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Error from OTP verification:", error);
      alert(
        "Error verifying OTP: " +
          (error.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="signInContainer">
      <h2>{showPhoneInput ? "Update Phone Number" : "Sign In"}</h2>

      {!showPhoneInput && !showOtpVerify && (
        <button onClick={googleLoginHandler} className="google-login-btn">
          Sign in with Google
        </button>
      )}

      {showPhoneInput && (
        <form className="otpSection" onSubmit={handlePhoneNumberSubmit}>
          <div className="countryPhoneNumber">
            <select
              value={countryCode}
              className="countryCodeSelection"
              onChange={(e) => setCountryCode(e.target.value)}
              id="country-code"
            >
              {countryCodes.map(({ code, country }) => (
                <option value={code} key={code}>
                  ({code})
                </option>
              ))}
            </select>

            <div>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                className="otpSection_inputBox"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>
          <button className="google-login-btn" type="submit">
            Update Phone Number
          </button>
        </form>
      )}

      {showOtpVerify && (
        <div className="otpSection">
          <h3>Verify OTP</h3>
          <input
            type="text"
            placeholder="Enter OTP"
            className="otpSection_inputBox"
            value={enteredOtp}
            onChange={(e) => setEnteredOtp(e.target.value)}
            required
          />
          <button className="google-login-btn" onClick={handleOtpVerification}>
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
}

export default SignIn;
