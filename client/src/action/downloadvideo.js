import * as api from "../Api";

export const addToDownloadedVideo =
  (videoid, downloadedVideoData) => async (dispatch) => {
    try {
      const { data } = await api.addToDownloadedVideo(
        videoid,
        downloadedVideoData
      );
      dispatch({ type: "POST_DOWNLOADEDVIDEO", data });
      dispatch(getAllDownloadedVideo()); // Fetch the updated list of downloaded videos
      return data; // Ensure you can handle responses in the component
    } catch (error) {
      if (error.response.status === 403) {
        alert(
          "You have reached your download limit for today. Upgrade to Gold for unlimited downloads."
        );
      } else {
        alert("An error occurred. Please try again later.");
      }
    }
  };

export const downloadVideo = (videoid, id) => async (dispatch) => {
  try {
    const response = await api.downloadVideo(videoid, id);

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `video_${videoid}.mp4`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Video ${videoid} downloaded successfully!`);
  } catch (error) {
    if (error.response.status === 403) {
      alert(
        "You have reached your download limit for today. Upgrade to Gold for unlimited downloads."
      );
    } else {
      alert("An error occurred. Please try again later.");
    }
  }
};

export const getAllDownloadedVideo = () => async (dispatch) => {
  try {
    const { data } = await api.getAllDownloadedVideo();
    dispatch({ type: "FETCH_ALL_DOWNLOADED_VIDEOS", payload: data });
  } catch (error) {
    console.error("Error fetching downloaded videos:", error);
  }
};

export const deleteDownloadedVideo =
  (downloadvideodata) => async (dispatch) => {
    try {
      const { videoid, viewer } = downloadvideodata;
      await api.deleteDownloadedVideo(videoid, viewer);
      dispatch(getAllDownloadedVideo());
    } catch (error) {
      console.error("Error deleting downloaded video:", error);
    }
  };
