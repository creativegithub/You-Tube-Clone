import * as api from "../Api";

export const fetchallchannel = () => async (dispatch) => {
  try {
    const { data } = await api.fetchallchannel();
    dispatch({ type: "FETCH_CHANELS", payload: data });
  } catch (error) {
    console.error(error);
  }
};

export const updatechanneldata = (id, updatedata) => async (dispatch) => {
  try {
    const { data } = await api.updatechanneldata(id, updatedata);
    dispatch({ type: "UPDATE_DATA", payload: data });
  } catch (error) {
    console.error(error);
  }
};
