import React from "react";
import "./Showvideo.css";
import { Link } from "react-router-dom";
import moment from "moment";

function Showvideo({ vid }) {
  // console.log(vid);

  return (
    <>
      <Link to={`/videopage/${vid?._id}`}>
        <video
          src={`http://localhost:5000/${vid.filepath}`}
          className="video_ShowVideo"
        />
      </Link>
      <div className="video_description">
        <div style={{ marginTop: "1.3rem" }} className="Channel_logo_App">
          <div className="fstChar_logo_App">
            {vid?.uploader?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div className="video_details">
          <p className="title_vid_ShowVideo">{vid?.videotitle}</p>
          <p className="vid_views_UploadTime">{vid?.uploader}</p>
          <div className="vid_views_UploadTime">
            {vid?.views} views
            <div className="dot"></div> {moment(vid?.createdAt).fromNow()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Showvideo;
