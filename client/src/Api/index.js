import axios from "axios";

const API = axios.create({ baseURL: `http://localhost:5000` });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const login = (authdata, latitude, longitude) =>
  API.post("/user/login", { ...authdata, latitude, longitude });

export const updatePhoneNumber = (id, newPhoneNumber) =>
  API.post(`/user/update-phone/${id}`, newPhoneNumber);

export const sendOtp = (otpData) => API.post(`/user/send-otp`, otpData);
export const verifyOtp = (otpData) => API.post(`/user/verify-otp`, otpData);

export const updateUserCity = (id, latitude, longitude) =>
  API.post(`/user/update-city/${id}`, { latitude, longitude });

export const updateUserPlan = (id, newPlan) =>
  API.post(`/user/update-plan/${id}`, newPlan);

export const updatechanneldata = (id, updatedata) =>
  API.patch(`/user/update/${id}`, updatedata);

export const fetchallchannel = () => API.get("/user/getallchannel");

export const uploadvideo = (filedata, fileoption) =>
  API.post("/video/uploadvideo", filedata, fileoption);
export const getvideos = () => API.get("/video/getvideos");
export const likevideo = (id, Like) => API.patch(`/video/like/${id}`, { Like });
export const viewsvideo = (id) => API.patch(`/video/view/${id}`);

export const postcomment = (commentdata) =>
  API.post("/comment/post", commentdata);
export const deletecomment = (id) => API.delete(`/comment/${id}/delete`);
export const editcomment = (id, commentBody) =>
  API.patch(`/comment/${id}/edit`, { commentBody });
export const getallcomment = () => API.get("/comment/get");
export const likeDislikeComment = (id, action) =>
  API.post(`/comment/${id}/likeDislike/${action}`, { action });
export const translateComment = (id, targetLanguage, originalLanguage) =>
  API.post(`/comment/${id}/translate`, { targetLanguage, originalLanguage });

export const addtohistory = (historydata) =>
  API.post("/video/history", historydata);
export const getallhistory = () => API.get("/video/getallhistory");
export const deletehistory = (userId) =>
  API.delete(`/video/deletehistory/${userId}`);

export const addtolikedvideo = (likedvideodata) =>
  API.post("/video/likedvideo", likedvideodata);
export const getalllikedvideo = () => API.get("/video/getalllikedvideo");
export const deletelikedvideo = (videoid, viewer) =>
  API.delete(`/video/deletelikedvideo/$(videoid)/$(viewer)`);

export const addToDownloadedVideo = (downloadvideodata) =>
  API.post("/video/downloadvideo", downloadvideodata);
export const downloadVideo = (videoid, id) =>
  API.get(`/video/download_video/${id}/${videoid}`, { responseType: "blob" });
export const getAllDownloadedVideo = () =>
  API.get("/video/getalldownloadedvideo");
export const deleteDownloadedVideo = (videoid, viewer) =>
  API.delete(`/video/deletedownloadedvideo/${videoid}/${viewer}`);

export const addtowatchlater = (watchlaterdata) =>
  API.post("/video/watchlater", watchlaterdata);
export const getallwatchlater = () => API.get("/video/getallwatchlater");
export const deletewatchlater = (videoid, viewer) =>
  API.apply(`/video/deletewatchlater/$(videoid)/$(viewer)`);

export const creategroup = (groupData) => API.post("/groups/create", groupData);
export const getallgroups = () => API.get("/groups");
export const deletegroup = (groupName) => API.delete(`/groups/${groupName}`);
export const addmember = (groupName, memberData) =>
  API.post(`/groups/${groupName}/add-member`, memberData);
export const getallmembers = (groupName) =>
  API.get(`/groups/${groupName}/members`);
export const sendmessage = (groupName, messageData) =>
  API.post(`/groups/${groupName}/sendmessage`, messageData);
export const getmessages = (groupName) =>
  API.get(`/groups/${groupName}/messages`);
export const deletemessage = (groupName, messageId, updatedMessages) =>
  API.delete(`/groups/${groupName}/delete/${messageId}`, { updatedMessages });

export const fetchPlans = () => API.get("/plans");

export const savePaymentMethod = (userId, paymentData) =>
  API.post(`/payementmethod/save-payment-method/${userId}`, paymentData);

export const processPayment = (userId, paymentData) =>
  API.post(`/payments/payment-process/${userId}`, paymentData);

export const createPaymentOrder = (userId, amount) =>
  API.post(`/payment/create-order/${userId}`, { amount });

export const verifyPayment = (paymentData) =>
  API.post(`/payment/verify-payment`, paymentData);

export const startCall = (callerId, callerName) =>
  API.post("calls/", { callerId, callerName });
export const endCall = (id, recordingUrl) =>
  API.put(`calls/${id}`, { recordingUrl });
export const getCalls = () => API.get("/");
export const joinCallAPI = (callerId, userId) =>
  API.post("calls/join", { callerId, userId });
