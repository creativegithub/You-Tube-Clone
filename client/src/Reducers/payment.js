const paymentreducer = (
  state = { paymentMethods: [], paymentInfo: null },
  action
) => {
  switch (action.type) {
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        paymentMethods: [...state.paymentMethods, action.payload],
      };

    case "PAYMENT_SUCCESS":
      return {
        ...state,
        paymentInfo: action.payload,
      };

    default:
      return state;
  }
};

export default paymentreducer;
