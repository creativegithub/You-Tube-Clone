import * as api from "../Api";

export const uploadvideo = (videodata) => async (dispatch) => {
  try {
    const { filedata, fileoption } = videodata;
    // console.log(filedata, fileoption);
    const { data } = await api.uploadvideo(filedata, fileoption);
    dispatch({ type: "POST_VIDEO", data });
    dispatch(getallvideo());
  } catch (error) {
    alert(error.response.data.message);
    if (error.response && error.response.data) {
      alert(error.response.data.message);
    } else {
      alert("An unexpected error occurred.");
    }
  }
};

export const getallvideo = () => async (dispatch) => {
  try {
    const { data } = await api.getvideos();
    dispatch({ type: "FETCH_ALL_VIDEOS", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const likevideo = (likedata) => async (dispatch) => {
  try {
    const { id, Like } = likedata;
    // console.log(likedata);
    const { data } = await api.likevideo(id, Like);
    dispatch({ type: "POST_LIKE", payload: data });
    dispatch(getallvideo());
  } catch (error) {
    console.error(error);
  }
};

export const viewsvideo = (viewdata) => async (dispatch) => {
  try {
    const { id } = viewdata;
    // console.log(id);
    const { data } = await api.viewsvideo(id);
    dispatch({ type: "POST_VIEWS", data });
    dispatch(getallvideo());
  } catch (error) {
    console.error(error);
  }
};
