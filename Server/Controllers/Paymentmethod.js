import Paymentmethod from "../Models/Paymentmethod.js";

export const savePaymentMethod = async (req, res) => {
  const { userId } = req.params;
  const {
    plan,
    paymentMethod,
    cardNumber,
    cardholderName,
    expiryDate,
    cvv,
    atmNumber,
    upiId,
    accountNumber,
  } = req.body;

  try {
    const paymentData = new Paymentmethod({
      userId,
      plan,
      paymentMethod,
      cardDetails: {
        cardNumber:
          paymentMethod === "Credit or Debit Card" ? cardNumber : undefined,
        cardholderName:
          paymentMethod === "Credit or Debit Card" ? cardholderName : undefined,
        expiryDate:
          paymentMethod === "Credit or Debit Card" ? expiryDate : undefined,
        cvv: paymentMethod === "Credit or Debit Card" ? cvv : undefined,
      },
      atmNumber: paymentMethod === "ATM" ? atmNumber : undefined,
      upiId: paymentMethod === "UPI" ? upiId : undefined,
      accountNumber:
        paymentMethod === "Net Banking" ? accountNumber : undefined,
    });

    await paymentData.save();
    // console.log("Payment data saved: ", paymentData);
    res.status(201).json({
      message: "Payment method saved successfully!",
      paymentData,
    });
  } catch (error) {
    console.error("Error saving payment method: ", error.message);
    res
      .status(500)
      .json({ message: "Error saving payment method", error: error.message });
  }
};
