const authReducer = (
  state = { data: null, otpSent: false, otpVerified: false },
  action
) => {
  switch (action.type) {
    case "AUTH":
      localStorage.setItem("Profile", JSON.stringify({ ...action?.data }));
      return { ...state, data: action?.data };

    case "SEND_OTP":
      return { ...state, otpSent: true, message: action.payload.message };

    case "VERIFY_OTP":
      return { ...state, data: action.data, otpVerified: true };

    case "UPDATE_PHONE_NUMBER":
      return {
        ...state,
        data: {
          ...state.data,
          phoneNumber: action.payload.phoneNumber,
          otpVerified: false,
        },
      };

    case "UPDATE_USER_PLAN":
      return {
        ...state,
        data: {
          ...state.data,
          plan: action.payload.plan,
          maxDownloads: action.payload.maxDownloads,
        },
      };

    case "UPDATE_CITY":
      return {
        ...state,
        data: {
          ...state.data,
          city: action.payload.city,
          state: action.payload.state,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
