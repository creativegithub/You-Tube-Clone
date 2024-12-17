import { combineReducers } from "redux";
import authreducer from "./auth";
import currentuserreducer from "./currentuser";
import channelreducer from "./channel";
import videoreducer from "./video";
import commentreducer from "./comment";
import historyreducer from "./history";
import likedvideoreducer from "./likedvideo";
import watchlaterreducer from "./watchlater";
import groupreducer from "./group";
import planreducer from "./plan";
import downloadedvideoreducer from "./downloadvideo";
import callreducer from "./call";

export default combineReducers({
  authreducer,
  currentuserreducer,
  channelreducer,
  videoreducer,
  commentreducer,
  historyreducer,
  likedvideoreducer,
  watchlaterreducer,
  groupreducer,
  planreducer,
  downloadedvideoreducer,
  callreducer,
});
