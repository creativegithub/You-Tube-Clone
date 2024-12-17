const callreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "SET_CALLS":
      return { ...state, data: action.payload };
    case "CREATE_CALL":
      return { ...state, data: [...state.data, action.payload] };
    case "END_CALL":
      return {
        ...state,
        data: state.data.map((call) =>
          call._id === action.payload._id ? action.payload : call
        ),
      };
    default:
      return state;
  }
};

export default callreducer;
