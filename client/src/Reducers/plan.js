const planreducer = (
  state = [],

  action
) => {
  switch (action.type) {
    case "FETCH_PLANS":
      return action.payload;

    default:
      return state;
  }
};

export default planreducer;
