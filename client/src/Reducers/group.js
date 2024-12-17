const groupreducer = (
  state = { groups: [], messages: [], members: {} },
  action
) => {
  switch (action.type) {
    case "GET_GROUPS":
      return { ...state, groups: action.payload };

    case "CREATE_GROUP":
      return { ...state, groups: [...state.groups, action.payload] };

    case "DELETE_GROUP":
      return {
        ...state,
        groups: state.groups.filter((group) => group.name !== action.payload),
      };

    case "ADD_MEMBER":
      return {
        ...state,
        members: {
          ...state.members,
          [action.payload.groupName]: action.payload.members,
        },
      };

    case "GET_MEMBERS":
      return {
        ...state,
        members: {
          ...state.members,
          [action.payload.groupName]: action.payload.members,
        },
      };

    case "SEND_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "FETCH_MESSAGES":
      return { ...state, messages: action.payload };

    case "DELETE_MESSAGE":
      return {
        ...state,
        messages: action.payload.updatedMessages, // Use the updated messages from payload
      };

    default:
      return state;
  }
};

export default groupreducer;
