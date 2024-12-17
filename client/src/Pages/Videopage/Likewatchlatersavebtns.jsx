import React, { useEffect, useState } from "react";
import "./Likewatchlatersavebtns.css";
import { BsThreeDots } from "react-icons/bs";
import {
  AiFillDislike,
  AiFillLike,
  AiOutlineDislike,
  AiOutlineLike,
} from "react-icons/ai";
import { MdPlaylistAddCheck } from "react-icons/md";
import {
  RiHeartAddFill,
  RiPlayListAddFill,
  RiShareForwardLine,
  RiSlideshowFill,
} from "react-icons/ri";
import { IoMdDownload } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { likevideo } from "../../action/video";
import { addtolikedvideo, deletelikedvideo } from "../../action/likedvideo";
import { addtowatchlater, deletewatchlater } from "../../action/watchlater";
import {
  addToDownloadedVideo,
  downloadVideo,
} from "../../action/downloadvideo";
import { useNavigate } from "react-router-dom";

function Likewatchlatersavebtns({ vv, vid }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [likeBtn, setLikeBtn] = useState(false);
  const [dislikeBtn, setDislikeBtn] = useState(false);
  const [saveVideo, setSaveVideo] = useState(false);
  const [downloadedVideo, setDownloadedVideo] = useState(false);

  // console.log("Likewatchlatersavebtns vv,vid :- ", vv);

  const currentuser = useSelector((state) => state.currentuserreducer);
  const WatchLatervideoList = useSelector((state) => state.watchlaterreducer);
  const LikedvideoList = useSelector((state) => state.likedvideoreducer);
  const DownloadvideoList = useSelector(
    (state) => state.downloadedvideoreducer
  );

  useEffect(() => {
    LikedvideoList?.data
      ?.filter((q) => q.videoid === vid && q.viewer === currentuser.result._id)
      .map((m) => setLikeBtn(true));

    WatchLatervideoList?.data
      ?.filter((q) => q.videoid === vid && q.viewer === currentuser.result._id)
      .map((m) => setSaveVideo(true));

    DownloadvideoList?.data
      ?.filter((q) => q.videoid === vid && q.viewer === currentuser.result._id)
      .map((m) => setDownloadedVideo(true));
  }, []);

  const toggleLikeBtn = (e, lk) => {
    if (currentuser) {
      if (likeBtn) {
        setLikeBtn(false);
        dispatch(likevideo({ id: vid, Like: lk - 1 }));
        dispatch(
          deletelikedvideo({ videoid: vid, viewer: currentuser?.result?._id })
        );
      } else {
        setLikeBtn(true);
        dispatch(likevideo({ id: vid, Like: lk + 1 }));
        dispatch(
          addtolikedvideo({ videoid: vid, viewer: currentuser?.result?._id })
        );
        setDislikeBtn(false);
      }
    } else {
      alert("Please login to Like video !!");
    }
  };

  const toggleDislikeBtn = (e, lk) => {
    if (currentuser) {
      if (dislikeBtn) {
        setDislikeBtn(false);
      } else {
        setDislikeBtn(true);
        if (likeBtn) {
          dispatch(likevideo({ id: vid, Like: lk - 1 }));
          dispatch(
            deletelikedvideo({ videoid: vid, viewer: currentuser?.result?._id })
          );
        }
        setLikeBtn(false);
      }
    } else {
      alert("Please login to Dislike video !!");
    }
  };

  const toggleSavedVideos = () => {
    if (currentuser) {
      if (saveVideo) {
        setSaveVideo(false);
        dispatch(
          deletewatchlater({ videoid: vid, viewer: currentuser?.result._id })
        );
      } else {
        setSaveVideo(true);
        dispatch(
          addtowatchlater({ videoid: vid, viewer: currentuser?.result?._id })
        );
      }
    } else {
      alert("Please login to save video !!");
    }
  };

  const handleDownload = async () => {
    if (!currentuser) {
      alert("Please log in to download the video.");
      return;
    }

    const downloadvideodata = {
      videoid: vid,
      viewer: currentuser.result._id,
    };

    if (downloadedVideo) {
      setDownloadedVideo(false);
    } else {
      setDownloadedVideo(true);
    }

    try {
      await dispatch(addToDownloadedVideo(downloadvideodata));
      await dispatch(downloadVideo(vid, currentuser.result._id));
      setDownloadedVideo(true);
    } catch (error) {
      if (error.response) {
        // Check for 403 error specifically
        if (error.response.status === 403) {
          alert(
            "You have reached your download limit for today. Upgrade to Gold for unlimited downloads."
          );
        } else {
          alert("An error occurred. Please try again later.");
        }
      } else {
        // In case of network or server issues
        console.error("Error: ", error);
        alert("Network error. Please check your internet connection.");
      }
    }
  };

  const handlePlanClick = () => {
    navigate("/Plan", {
      state: { fromVideoPage: false, videoId: vid }, // Adjust state as needed
    });
  };

  return (
    <div className="btns_cont_videoPage">
      <div className="btn_videoPage">
        <BsThreeDots />
      </div>

      <div className="btn_videoPage">
        <div
          className="like_videoPage"
          onClick={(e) => toggleLikeBtn(e, vv.Like)}
        >
          {likeBtn ? (
            <>
              <AiFillLike size={22} className="btns_videoPage" />
            </>
          ) : (
            <>
              <AiOutlineLike size={22} className="btns_videoPage" />
            </>
          )}
          <b>{vv.Like}</b>
        </div>
        <div
          className="like_videoPage"
          onClick={(e) => toggleDislikeBtn(e, vv.Like)}
        >
          {dislikeBtn ? (
            <>
              <AiFillDislike size={22} className="btns_videoPage" />
            </>
          ) : (
            <>
              <AiOutlineDislike size={22} className="btns_videoPage" />
            </>
          )}
          <b>DisLike</b>
        </div>
        <div className="like_videoPage" onClick={(e) => toggleSavedVideos(e)}>
          {saveVideo ? (
            <>
              <MdPlaylistAddCheck size={22} className="btns_videoPage" />
              <b>Save</b>
            </>
          ) : (
            <>
              <RiPlayListAddFill size={22} className="btns_videoPage" />
              <b>Saved</b>
            </>
          )}
        </div>
        <div className="like_videoPage">
          <>
            <RiHeartAddFill size={22} className="btns_videoPage" />
            <b>Thanks</b>
          </>
        </div>
        <div className="like_videoPage">
          <>
            <RiShareForwardLine size={22} className="btns_videoPage" />
            <b>Share</b>
          </>
        </div>
        {/* New Download Video Button */}
        <div className="like_videoPage" onClick={handleDownload}>
          <>
            <IoMdDownload size={22} className="btns_videoPage" />
            <b>{downloadedVideo ? "Downloaded" : "Download"}</b>
          </>
        </div>
        <div className="like_videoPage" onClick={handlePlanClick}>
          <>
            <RiSlideshowFill size={22} className="btns_videoPage" />
            <b>Video Plan</b>
          </>
        </div>
      </div>
    </div>
  );
}

export default Likewatchlatersavebtns;
