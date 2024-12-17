import React from "react";
import "./Yourvideo.css";
// import vid from "../../Components/Video/Video.mp4";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import Showvideogrid from "../../Components/Showvideogrid/Showvideogrid";
import { useSelector } from "react-redux";

function Yourvideo() {
  const currentuser = useSelector((state) => state.currentuserreducer);

  const YourvideoList = useSelector((s) => s.videoreducer)
    ?.data?.filter((q) => q.videochannel === currentuser?.result._id)
    .reverse();

  // const YourvideoList = [
  //   {
  //     _id: 1,
  //     video_src: vid,
  //     chanel: "62bafe6752cea35a6c30685f",
  //     title: "video 1",
  //     uploader: "abc",
  //     description: "description of video 1",
  //   },
  //   {
  //     _id: 2,
  //     video_src: vid,
  //     chanel: "cdd",
  //     title: "video 2",
  //     uploader: "mno",
  //     description: "description of video 2",
  //   },
  //   {
  //     _id: 3,
  //     video_src: vid,
  //     chanel: "add",
  //     title: "video 3",
  //     uploader: "pqr",
  //     description: "description of video 3",
  //   },
  //   {
  //     _id: 4,
  //     video_src: vid,
  //     chanel: "trade",
  //     title: "video 4",
  //     uploader: "xyz",
  //     description: "description of video 4",
  //   },
  // ];

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="container_yourvideo">
          <h1>Your Video</h1>
          {currentuser ? (
            <>
              <Showvideogrid vid={YourvideoList} />
            </>
          ) : (
            <>
              <h3>Please Login to see Your upload video list</h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Yourvideo;
