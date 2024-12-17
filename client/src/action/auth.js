import * as api from "../Api";
import { setcurrentuser } from "./currentuser";

export const login = (authdata) => async (dispatch) => {
  try {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const { data } = await api.login(authdata, latitude, longitude);

          dispatch({ type: "AUTH", data });
          dispatch(setcurrentuser(JSON.parse(localStorage.getItem("Profile"))));
        },
        (err) => {
          console.error("Geolocation error:", err);
          alert("Unable to access your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  } catch (error) {
    console.error("Google Login error:", error);
    alert(
      "Login failed: " + (error.response?.data?.message || "Unknown error")
    );
  }
};

export const updatePhoneNumber = (id, newPhoneNumber) => async (dispatch) => {
  try {
    const { data } = await api.updatePhoneNumber(id, {
      phoneNumber: newPhoneNumber,
    });
    dispatch({ type: "UPDATE_PHONE_NUMBER", payload: data.updatedUser });
    // console.log("Updated user Phonenumber:", data);
  } catch (error) {
    console.error("Error updating phone number:", error);
    throw error;
  }
};

export const sendOtp = (otpData) => async (dispatch) => {
  try {
    const { data } = await api.sendOtp(otpData);
    dispatch({ type: "SEND_OTP", payload: data });
    return data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtp = (otpData) => async (dispatch) => {
  try {
    const { data } = await api.verifyOtp(otpData);
    if (data.token) {
      // Check if token exists in response
      localStorage.setItem(
        "Profile",
        JSON.stringify({ token: data.token, result: data.result })
      );
      dispatch({ type: "VERIFY_OTP", data });
    }
    return data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert(
      "Error verifying OTP: " +
        (error.response?.data?.message || "Unknown error")
    );
  }
};

// Update city action
export const updateCity = (id, latitude, longitude) => async (dispatch) => {
  try {
    const { data } = await api.updateUserCity(id, latitude, longitude);
    dispatch({
      type: "UPDATE_CITY",
      payload: data.result, // Assuming the response contains the updated user data
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUserPlan = (id, newPlan) => async (dispatch) => {
  try {
    const { data } = await api.updateUserPlan(id, { plan: newPlan });
    dispatch({ type: "UPDATE_USER_PLAN", payload: data });
    // console.log("Updated user plan:", data);
  } catch (error) {
    console.error(error);
  }
};
