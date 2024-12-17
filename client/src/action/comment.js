import * as api from "../Api";

export const editcomment = (commentdata) => async (dispatch) => {
  try {
    const { id, commentBody } = commentdata;
    const { data } = await api.editcomment(id, commentBody);
    dispatch({ type: "EDIT_COMMENT", payload: data });
    dispatch(getallcomment());
  } catch (error) {
    console.error(error);
  }
};

export const postcomment = (commentdata) => async (dispatch) => {
  try {
    const { data } = await api.postcomment(commentdata);
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(getallcomment());
  } catch (error) {
    console.error(error);
  }
};

export const getallcomment = () => async (dispatch) => {
  try {
    const { data } = await api.getallcomment();
    dispatch({ type: "FETCH_ALL_COMMENTS", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const deletecomment = (id) => async (dispatch) => {
  try {
    await api.deletecomment(id);
    dispatch(getallcomment());
  } catch (error) {
    console.error(error);
  }
};

export const likeDislikeComment = (id, action) => async (dispatch) => {
  try {
    const { data } = await api.likeDislikeComment(id, action);
    dispatch({ type: "LIKE_DISLIKE_COMMENT", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const translateComment =
  (id, targetLanguage, originalLanguage) => async (dispatch) => {
    try {
      const { data } = await api.translateComment(
        id,
        targetLanguage,
        originalLanguage
      );
      dispatch({
        type: "TRANSLATE_COMMENT",
        payload: { id, translatedComment: data.translatedComment },
      });
    } catch (error) {
      console.error(error);
    }
  };
