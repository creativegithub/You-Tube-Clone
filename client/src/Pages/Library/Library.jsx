import React from "react";
import "./Library.css";
import { FaHistory, FaDownload } from "react-icons/fa";
// import vid from "../../Components/Video/Video.mp4";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import WHLvideolist from "../../Components/WHL/WHLvideolist";
import { MdOutlineWatchLater } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { useSelector } from "react-redux";

function Library() {
  const currentuser = useSelector((state) => state.currentuserreducer);

  const LikedvideoList = useSelector((state) => state.likedvideoreducer);

  const WatchLatervideoList = useSelector((state) => state.watchlaterreducer);

  const WatchHistoryvideoList = useSelector((state) => state.historyreducer);

  const DownloadedvideoList = useSelector(
    (state) => state.downloadedvideoreducer
  );

  // const currentuser = {
  //   result: {
  //     _id: 1,
  //     name: "abcjabsc",
  //     email: "xyz@gmail.com",
  //     joinedOn: "2222-07-1ST09:57:23.489Z",
  //   },
  // };

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

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="container_LibraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <FaHistory />
            </b>
            <b>History</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLvideolist
              page={"History"}
              currentuser={currentuser?.result?._id}
              videolist={WatchHistoryvideoList}
            />
          </div>
        </div>
        <div className="container_LibraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <MdOutlineWatchLater />
            </b>
            <b>Watch Later</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLvideolist
              page={"Watch Later"}
              currentuser={currentuser?.result?._id}
              videolist={WatchLatervideoList}
            />
          </div>
        </div>
        <div className="container_LibraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <AiOutlineLike />
            </b>
            <b>Liked Videos</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLvideolist
              page={"Liked Videos"}
              currentuser={currentuser?.result?._id}
              videolist={LikedvideoList}
            />
          </div>
        </div>
        <div className="container_LibraryPage">
          <h1 className="title_container_LibraryPage">
            <b>
              <FaDownload />
            </b>
            <b>Downloaded Videos</b>
          </h1>
          <div className="container_videoList_LibraryPage">
            <WHLvideolist
              page={"Downloaded Videos"}
              currentuser={currentuser?.result?._id}
              videolist={DownloadedvideoList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Library;
