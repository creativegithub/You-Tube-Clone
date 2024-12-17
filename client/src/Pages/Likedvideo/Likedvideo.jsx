import React from "react";
// import vid from "../../Components/Video/Video.mp4";
import WHL from "../../Components/WHL/WHL";
import { useSelector } from "react-redux";

function Likedvideo() {
  const LikedvideoList = useSelector((state) => state.likedvideoreducer);
  // console.log(LikedvideoList);

  // const LikedvideoList = [
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

  return <WHL page={"Liked Video"} videolist={LikedvideoList} />;
}

export default Likedvideo;
