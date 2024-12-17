import React from "react";

const PaymentmethodForm = ({ paymentMethod, formData, handleChange }) => {
  return (
    <>
      {paymentMethod === "Credit or Debit Card" && (
        <div className="selectedMethodForm">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            className="inputFormDetail"
            required
          />
          <input
            type="text"
            name="cardholderName"
            placeholder="Cardholder Name"
            value={formData.cardholderName}
            onChange={handleChange}
            className="inputFormDetail"
            required
          />
          <input
            type="text"
            name="expiryDate"
            placeholder="Expiry Date (MM/YY)"
            value={formData.expiryDate}
            onChange={handleChange}
            className="inputFormDetail"
            required
          />
          <input
            type="password"
            name="cvv"
            placeholder="CVV"
            value={formData.cvv}
            onChange={handleChange}
            className="inputFormDetail"
            required
          />
        </div>
      )}
      {paymentMethod === "ATM" && (
        <div className="selectedMethodForm">
          <input
            type="text"
            className="inputFormDetail"
            placeholder="ATM Number"
            name="atmNumber"
            value={formData.atmNumber}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {paymentMethod === "UPI" && (
        <div className="selectedMethodForm">
          <input
            type="text"
            className="inputFormDetail"
            placeholder="UPI ID"
            name="upiId"
            value={formData.upiId}
            onChange={handleChange}
            required
          />
        </div>
      )}
      {paymentMethod === "Net Banking" && (
        <div className="selectedMethodForm">
          <input
            type="text"
            className="inputFormDetail"
            placeholder="Bank Account Number"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            required
          />
        </div>
      )}
    </>
  );
};

export default PaymentmethodForm;
