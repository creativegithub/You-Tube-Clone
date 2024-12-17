import React, { useEffect } from "react";
import "./Home.css";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import Showvideogrid from "../../Components/Showvideogrid/Showvideogrid";
// import vid from "../../Components/Video/Video.mp4";
import { useSelector } from "react-redux";

function Home() {
  const vids = useSelector((state) => state.videoreducer)
    ?.data?.filter((q) => q)
    .reverse();

  // const vids = [
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

  const NavList = [
    "All",
    "Python",
    "Java",
    "C++",
    "Movies",
    "Science",
    "Animation",
    "Gaming",
    "Comedy",
  ];

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="navigation_Home">
          {NavList.map((m) => {
            return (
              <p key={m} className="btn_nav_Home">
                {m}
              </p>
            );
          })}
        </div>
        <Showvideogrid vid={vids} />
      </div>
    </div>
  );
}

export default Home;
