import * as api from "../Api";

export const fetchPlans = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPlans();
    // console.log("Fetched Plans:", data);
    dispatch({ type: "FETCH_PLANS", payload: data });
  } catch (error) {
    console.error(error);
  }
};
