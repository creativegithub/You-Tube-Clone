import React from "react";
import WHL from "../../Components/WHL/WHL";
import { useSelector } from "react-redux";

function Downloadvideo() {
  const DownloadedvideoList = useSelector(
    (state) => state.downloadedvideoreducer
  );

  // console.log("Downloadvideo List :- ", DownloadedvideoList);

  return <WHL page={"Downloaded Video"} videolist={DownloadedvideoList} />;
}

export default Downloadvideo;
