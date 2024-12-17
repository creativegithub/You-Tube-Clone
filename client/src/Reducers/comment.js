const commentreducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case "POST_COMMENT":
      return {
        ...state,
        data: [...state.data, action.payload], // Add new comment to the start
      };

    case "EDIT_COMMENT":
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };

    case "FETCH_ALL_COMMENTS":
      return {
        ...state,
        data: action.payload, // Replace all comments with the fetched data
      };

    case "DELETE_COMMENT":
      return {
        ...state,
        data: state.data.filter((comment) => comment._id !== action.payload), // Remove deleted comment by id
      };

    case "LIKE_DISLIKE_COMMENT":
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };

    case "TRANSLATE_COMMENT": // Handle the translation action here
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload.id
            ? {
                ...comment,
                translatedComment: action.payload.translatedComment,
              }
            : comment
        ),
      };

    default:
      return state;
  }
};

export default commentreducer;
