  import "./Videopage.css";
  import Likewatchlatersavebtns from "./Likewatchlatersavebtns";
  import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
  import Comment from "../../Components/Comment/Comment";
  import moment from "moment";
  import { useDispatch, useSelector } from "react-redux";
  import { viewsvideo } from "../../action/video";
  import { addtohistory } from "../../action/history";
  import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
  import { BiSolidBellRing } from "react-icons/bi";
  import { MdPauseCircle, MdPlayCircle } from "react-icons/md";
  import { TbRewindForward10, TbRewindBackward10 } from "react-icons/tb";
  import { useEffect, useRef, useState } from "react";

  function Videopage() {
    const { vid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const videoRef = useRef(null);
    const [canWatch, setCanWatch] = useState(true);
    const [watchedTime, setWatchedTime] = useState(0);
    const [icon, setIcon] = useState(null); 
    const [iconPosition, setIconPosition] = useState(""); 
    const [iconTimeout, setIconTimeout] = useState(null); 

    const vids = useSelector((state) => state.videoreducer);
    const currentuser = useSelector((state) => state.currentuserreducer);
    const userPlan = currentuser?.result?.plan;
    const currentVideo = vids?.data?.find((q) => q._id === vid);

    const watchTimeLimits = {
      Free: 5 * 60,
      Bronze: 7 * 60,
      Silver: 10 * 60,
      Gold: Infinity,
    };

    const maxWatchTime =
      userPlan && watchTimeLimits[userPlan]
        ? watchTimeLimits[userPlan]
        : watchTimeLimits.Free;

    const relatedVideos = Array.isArray(vids?.data)
      ? vids.data.filter((video) => video._id !== vid).slice(0, 5)
      : [];

    useEffect(() => {
      if (!vid) {
        console.error("Video ID is undefined.");
      } else {
        if (currentuser) {
          dispatch(
            addtohistory({ videoid: vid, viewer: currentuser?.result._id })
          );
        }
        dispatch(viewsvideo({ id: vid }));
      }
    }, [currentuser, vid, dispatch]);

    // Handle video time update
    useEffect(() => {
      const videoElement = videoRef.current;

      const handleVideoTimeUpdate = () => {
        const currentTime = Math.floor(videoElement.currentTime);
        setWatchedTime(currentTime);
        if (currentTime >= maxWatchTime && canWatch) {
          videoElement.pause();
          setCanWatch(false);
        }
      };

      if (videoElement) {
        videoElement.addEventListener("timeupdate", handleVideoTimeUpdate);
      }

      return () => {
        if (videoElement) {
          videoElement.removeEventListener("timeupdate", handleVideoTimeUpdate);
        }
      };
    }, [maxWatchTime, canWatch]);

    // Reset the state when a new video is played
    useEffect(() => {
      setWatchedTime(0);
      setCanWatch(true); // Re-enable watching for the new video
    }, [vid]);

    const handleGesture = (event) => {
      event.preventDefault(); // Prevent context menu for the right-click

      const xPercent = event.nativeEvent.offsetX / videoRef.current.offsetWidth;

      // Clear any existing timeout to prevent overlapping icons
      if (iconTimeout) {
        clearTimeout(iconTimeout);
      }

      let newIcon = null;
      let positionClass = "";

      if (event.detail === 1) {
        // Single tap: Play/Pause
        const isPaused = videoRef.current.paused;
        videoRef.current.paused
          ? videoRef.current.play()
          : videoRef.current.pause();
        newIcon = isPaused ? <MdPauseCircle /> : <MdPlayCircle />;
        positionClass = "center_tapMsg";
      } else if (event.detail === 2) {
        // Double tap: Forward/Backward
        if (xPercent > 0.75) {
          videoRef.current.currentTime += 5; // Forward 5 seconds
          newIcon = <TbRewindForward10 />;
          positionClass = "right_tapMsg";
        } else if (xPercent < 0.25) {
          videoRef.current.currentTime -= 5; // Backward 5 seconds
          newIcon = <TbRewindBackward10 />;
          positionClass = "left_tapMsg";
        }
      } else if (event.detail === 3) {
        // Triple tap actions
        if (xPercent >= 0.4 && xPercent <= 0.6) {
          // Middle: Navigate to next video
          const nextVideoIndex =
            (relatedVideos.findIndex((video) => video._id === currentVideo._id) +
              1) %
            relatedVideos.length;
          navigate(`/videopage/${relatedVideos[nextVideoIndex]._id}`);
        } else if (xPercent > 0.75) {
          // Right side: Close the website
          alert(
            "Please close this tab/window manually or navigate to another page."
          );
          window.close();
        } else if (xPercent < 0.25) {
          // Left side: Show comments section
          const commentsSection = document.querySelector(".comments_videoPage");
          if (commentsSection) {
            commentsSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      }

      // Set the new icon and its position
      setIcon(newIcon);
      setIconPosition(positionClass);

      // Set a timeout to clear the icon after 3 seconds
      const timeoutId = setTimeout(() => {
        setIcon(null);
        setIconPosition("");
      }, 1000);
      setIconTimeout(timeoutId);
    };

    if (!currentVideo) {
      return <div>Video not found. Please try again later.</div>;
    }

    return (
      <div className="container_Pages_App">
        <Leftsidebar />
        <div className="container2_Pages_App">
          <div className="container_videoPage">
            {!currentuser?.result?.name ? (
              <h2>Please log in to watch video.</h2>
            ) : (
              <>
                <div className="video_display_screen_videoPage">
                  {!canWatch ? (
                    <div className="watch_time_message">
                      <p>
                        Your watch time limit has been reached. Please upgrade
                        your plan to continue watching.
                      </p>
                      <button
                        className="upgrade_plan"
                        onClick={() =>
                          navigate("/Plan", {
                            state: { fromVideoPage: true, videoId: vid },
                          })
                        }
                      >
                        Upgrade Plan
                      </button>
                    </div>
                  ) : (
                    <div className="video_container">
                      <video
                        ref={videoRef}
                        src={`http://localhost:5000/${currentVideo.filepath}`}
                        className="video_ShowVideo_videoPage"
                        autoPlay
                        controls
                        onClick={handleGesture}
                        onDoubleClick={handleGesture}
                        onContextMenu={handleGesture}
                      />
                      {/* Displaying icon */}
                      {icon && (
                        <div className={`action-icon ${iconPosition}`}>
                          {icon}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="video_details_videoPage">
                    <p className="video_title_videoPage">
                      {currentVideo.videotitle}
                    </p>
                    <div className="views_date_btns_videoPage">
                      <div className="views_videoPage">
                        {currentVideo.views} views <div className="dot"></div>{" "}
                        {moment(currentVideo.createdAt).fromNow()}
                      </div>
                      <Likewatchlatersavebtns vv={currentVideo} vid={vid} />
                    </div>
                  </div>
                  <div className="channel_details_cont">
                    <div>
                      <Link to="/" className="chanel_details_videoPage">
                        <b className="chanel_logo_videoPage">
                          <p>{currentVideo.uploader.charAt(0).toUpperCase()}</p>
                        </b>
                        <p className="chanel_name_videoPage">
                          {currentVideo.uploader}
                        </p>
                      </Link>
                    </div>
                    <button className="subscribe_btn">
                      <BiSolidBellRing className="btns_videoPage" />
                      Subscribe
                    </button>
                  </div>
                  <div className="comments_videoPage">
                    <h2>
                      <u>Comments </u>
                    </h2>
                    <Comment videoid={currentVideo._id} />
                  </div>
                </div>
                <div className="moreVideoBar">
                  <h2>More Videos</h2>
                  <div className="related_videos_container">
                    {relatedVideos.map((video) => (
                      <div
                        key={video._id}
                        className="relatedvideo_box"
                        onClick={() => navigate(`/videopage/${video._id}`)}
                      >
                        <video
                          src={`http://localhost:5000/${video.filepath}`}
                          className="realated_ShowVideo"
                          alt={video.videotitle}
                        />
                        <div className="video_description">
                          <div
                            style={{ marginTop: "1.3rem" }}
                            className="Channel_logo_App"
                          >
                            <div className="fstChar_logo_App">
                              {video.uploader?.charAt(0).toUpperCase()}
                            </div>
                          </div>
                          <div className="video_details">
                            <p className="title_vid_ShowVideo">
                              {video.videotitle}
                            </p>
                            <p className="vid_views_UploadTime">
                              {video.uploader}
                            </p>
                            <div className="vid_views_UploadTime">
                              {video.views} views
                              <div className="dot"></div>{" "}
                              {moment(video.createdAt).fromNow()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  export default Videopage;
