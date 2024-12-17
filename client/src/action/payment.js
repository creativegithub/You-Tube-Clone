import * as api from "../Api";

export const savePaymentMethod = (userId, paymentData) => async (dispatch) => {
  try {
    const { data } = await api.savePaymentMethod(userId, paymentData);
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: data });
    return data;
  } catch (error) {
    console.error("Error saving payment method:", error);
    throw new Error("Error saving payment method"); // This will be caught in your handlePayment
  }
};

export const makePayment = (paymentData) => async (dispatch) => {
  try {
    const { data } = await api.processPayment(paymentData.userId, paymentData);
    dispatch({ type: "PAYMENT_SUCCESS", payload: data });
    return data;
  } catch (error) {
    console.error("Error processing payment:", error);
    throw new Error(
      error.response?.data?.message || "Error processing payment"
    );
  }
};
