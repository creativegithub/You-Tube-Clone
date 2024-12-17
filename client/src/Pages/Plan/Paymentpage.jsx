import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAmazonPay } from "react-icons/fa6";
import { BsCreditCardFill } from "react-icons/bs";
import { MdLocalAtm } from "react-icons/md";
import { LuPictureInPicture } from "react-icons/lu";
import { PiBankFill } from "react-icons/pi";
import "./Paymentpage.css";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { useDispatch, useSelector } from "react-redux";
import { updateUserPlan } from "../../action/auth";
import { makePayment, savePaymentMethod } from "../../action/payment";
import PaymentmethodForm from "./PaymentmethodForm";

function Paymentpage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { plan, videoId, currentTime } = location.state || {};
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [invoice, setInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
    atmNumber: "",
    upiId: "",
    accountNumber: "",
  });

  const currentUser = useSelector((state) => state.currentuserreducer);

  const simulatePayment = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.2) {
          reject("Payment failed. Please try again.");
        } else {
          resolve(`Invoice: ${plan.name} Plan, Amount: ₹${plan.price}`);
        }
      }, 1000);
    });
  };

  const validateInputs = () => {
    if (!paymentMethod) return "Please select a payment method.";
    switch (paymentMethod) {
      case "Credit or Debit Card":
        return (
          (formData.cardNumber &&
            formData.cardholderName &&
            formData.expiryDate &&
            formData.cvv) ||
          "Please fill in all fields for Credit or Debit Card."
        );
      case "ATM":
        return formData.atmNumber || "Please enter your ATM number.";
      case "UPI":
        return formData.upiId || "Please enter your UPI ID.";
      case "Net Banking":
        return (
          formData.accountNumber || "Please enter your bank account number."
        );
      default:
        return false;
    }
  };

  const handlePayment = async () => {
    const userId = currentUser?.result?._id;

    if (!userId) {
      alert("User not logged in.");
      return;
    }

    const paymentData = {
      userId,
      plan: {
        _id: plan._id,
        name: plan.name,
        duration: plan.duration,
        price: plan.price,
        maxDownloads: plan.maxDownloads,
      },
      paymentMethod,
      cardNumber:
        paymentMethod === "Credit or Debit Card"
          ? formData.cardNumber
          : undefined,
      cardholderName:
        paymentMethod === "Credit or Debit Card"
          ? formData.cardholderName
          : undefined,
      expiryDate:
        paymentMethod === "Credit or Debit Card"
          ? formData.expiryDate
          : undefined,
      cvv: paymentMethod === "Credit or Debit Card" ? formData.cvv : undefined,
      atmNumber: paymentMethod === "ATM" ? formData.atmNumber : undefined,
      upiId: paymentMethod === "UPI" ? formData.upiId : undefined,
      accountNumber:
        paymentMethod === "Net Banking" ? formData.accountNumber : undefined,
    };

    try {
      const paymentResponse = await dispatch(makePayment(paymentData));
      await dispatch(savePaymentMethod(userId, paymentData));
      await dispatch(updateUserPlan(userId, plan.name));

      setInvoice(paymentResponse.invoice);
      setPaymentSuccess(true); // Set payment success
    } catch (error) {
      console.error("Payment failed:", error);
      setErrorMessage(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDuration = (duration) => {
    return duration === 9999999999 ? "Unlimited" : duration; // Transform large number to infinity symbol
  };

  // Effect to handle navigation after payment success
  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => {
        navigate(`/Videopage/${videoId}`, { state: { paymentSuccess: true } });
      }, 5000); // Redirect after 5 seconds

      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [paymentSuccess, navigate, videoId]);

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="paymentPage">
          <h1>Proceed to Payment</h1>
          {plan ? (
            <div className="paymentProcess">
              <div className="paymentDetails">
                <h2 className="selectedPlan">{plan.name} Plan</h2>
                <p className="selectedPlanDetail">
                  <strong>Watch Duration: </strong>
                  {formatDuration(plan.duration)} minutes
                </p>
                <p className="selectedPlanDetail">
                  <strong>You can Download: </strong>
                  <strong>{formatDuration(plan.maxDownloads)} videos</strong>
                </p>
                <p className="selectedPlanDetail">
                  <strong>Amount: </strong>
                  <strong>₹{plan.price}</strong>
                </p>

                {paymentSuccess ? (
                  <div className="invoice invoiceDetail">
                    <h2>Payment Successful!</h2>
                    <p>
                      Thank you for your purchase! Your transaction has been
                      completed successfully.
                    </p>
                    <p>You will be redirected to the video shortly...</p>
                  </div>
                ) : (
                  <>
                    {errorMessage && (
                      <div className="error-message">{errorMessage}</div>
                    )}
                    {!paymentMethod && (
                      <div className="paymentMethods">
                        Select your payment method:
                        <button
                          className="paymentMethodBtn"
                          onClick={() =>
                            setPaymentMethod("Credit or Debit Card")
                          }
                          disabled={loading}
                        >
                          <BsCreditCardFill className="icon" />
                          {loading ? "Processing..." : "Credit or Debit Card"}
                        </button>
                        <button
                          className="paymentMethodBtn"
                          onClick={() => setPaymentMethod("ATM")}
                          disabled={loading}
                        >
                          <MdLocalAtm className="icon" />
                          {loading ? "Processing..." : "ATM"}
                        </button>
                        <button
                          className="paymentMethodBtn"
                          onClick={() => setPaymentMethod("UPI")}
                          disabled={loading}
                        >
                          <LuPictureInPicture className="icon" />
                          {loading ? "Processing..." : "UPI"}
                        </button>
                        <button
                          className="paymentMethodBtn"
                          onClick={() => setPaymentMethod("Net Banking")}
                          disabled={loading}
                        >
                          <PiBankFill className="icon" />
                          {loading ? "Processing..." : "Net Banking"}
                        </button>
                      </div>
                    )}

                    {paymentMethod && (
                      <>
                        <div className="selected-method">
                          <h3>
                            Selected Payment Method:{" "}
                            <strong>{paymentMethod}</strong>
                          </h3>
                        </div>
                        <div className="selected-methods">
                          <PaymentmethodForm
                            paymentMethod={paymentMethod}
                            formData={formData}
                            handleChange={handleChange}
                          />
                        </div>
                        <button
                          className="paymentMethodBtn"
                          onClick={handlePayment}
                          disabled={loading}
                        >
                          <FaAmazonPay className="icon" />
                          {loading ? "Processing..." : `Pay ₹${plan.price} Now`}
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <h1>No plan selected. Please go back and select a plan.</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Paymentpage;
