import * as api from "../Api";

export const creategroup = (groupData) => async (dispatch) => {
  try {
    const { data } = await api.creategroup(groupData);
    dispatch({ type: "CREATE_GROUP", payload: data });
    // console.log("CREATE GROUP DATA :- ", data);
  } catch (error) {
    console.error(
      "Error creating group:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Failed to create group.");
  }
};

export const getallgroups = () => async (dispatch) => {
  try {
    const { data } = await api.getallgroups();
    dispatch({ type: "GET_GROUPS", payload: data });
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

export const deletegroup = (groupName) => async (dispatch) => {
  try {
    await api.deletegroup(groupName);
    dispatch({ type: "DELETE_GROUP", payload: groupName });
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};

export const addmember = (groupName, memberData) => async (dispatch) => {
  try {
    const { data } = await api.addmember(groupName, memberData);
    dispatch({ type: "ADD_MEMBER", payload: { groupName, members: data } });
  } catch (error) {
    console.error("Error adding member:", error);
  }
};

export const getallmembers = (groupName) => async (dispatch) => {
  try {
    const { data } = await api.getallmembers(groupName);
    dispatch({ type: "GET_MEMBERS", payload: { groupName, members: data } });
  } catch (error) {
    console.error("Error getting all members:", error);
  }
};

export const sendmessage = (groupName, messageData) => async (dispatch) => {
  try {
    const { data } = await api.sendmessage(groupName, messageData);
    dispatch({ type: "SEND_MESSAGE", payload: data });
  } catch (error) {
    console.error("Error sending message:", error);
  }
};

export const fetchmessages = (groupName) => async (dispatch) => {
  try {
    const { data } = await api.getmessages(groupName);
    // console.log("Fetched messages:", data); // Log the fetched messages
    dispatch({ type: "FETCH_MESSAGES", payload: data });
  } catch (error) {
    console.error("Error fetching messages:", error);
  }
};

export const deletemessage = (groupName, updatedMessages) => {
  return {
    type: "DELETE_MESSAGE",
    payload: { groupName, updatedMessages },
  };
};
