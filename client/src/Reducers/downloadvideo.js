  const downloadedvideoreducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "POST_DOWNLOADEDVIDEO":
        return { ...state, data: action?.data };

      case "FETCH_ALL_DOWNLOADED_VIDEOS":
        return { ...state, data: action?.payload };

      default:
        return state;
    }
  };

  export default downloadedvideoreducer;
