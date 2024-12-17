import * as api from "../Api";

export const createCall = (callerId, callerName) => async (dispatch) => {
  const { data } = await api.startCall(callerId, callerName);
  dispatch({ type: "CREATE_CALL", payload: data });
};

export const endExistingCall = (id, recordingUrl) => async (dispatch) => {
  const { data } = await api.endCall(id, recordingUrl);
  dispatch({ type: "END_CALL", payload: data });
};

export const joinCall = (callerId, userId) => async (dispatch) => {
  await api.joinCallAPI(callerId, userId);
  dispatch(fetchCalls());
};

export const fetchCalls = () => async (dispatch) => {
  const { data } = await api.getCalls();
  dispatch({ type: "SET_CALLS", payload: data });
};
