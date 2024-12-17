import * as api from "../Api";

export const addtohistory = (historydata) => async (dispatch) => {
  try {
    const { data } = await api.addtohistory(historydata);
    dispatch({ type: "POST_HISTORY", data });
    dispatch(getallhistory());
  } catch (error) {
    console.error(error);
  }
};

export const getallhistory = () => async (dispatch) => {
  try {
    const { data } = await api.getallhistory();
    dispatch({ type: "FETCH_ALL_HISTORY", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const clearhistory = (historydata) => async (dispatch) => {
  try {
    const { userId } = historydata;
    await api.deletehistory(userId);
    dispatch(getallhistory());
  } catch (error) {
    console.error(error);
  }
};
