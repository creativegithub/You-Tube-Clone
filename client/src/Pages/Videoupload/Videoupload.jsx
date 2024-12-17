import React, { useState } from "react";
import "./Videoupload.css";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useDispatch, useSelector } from "react-redux";
import { uploadvideo } from "../../action/video";

function Videoupload({ setVideouploadPage }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [videofile, setVideofile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const currentuser = useSelector((state) => state.currentuserreducer);

  const handlesetVideofile = (e) => {
    setVideofile(e.target.files[0]);
  };

  const fileoption = {
    onUploadProgress: (progressEvent) => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor((loaded * 100) / total); // Correct calculation
      setProgress(percentage);
      if (percentage === 100) {
        setTimeout(() => {
          setVideouploadPage(false);
          setSuccessMessage("Your video has been uploaded successfully!"); // Set success message
        }, 3000);
      }
    },
  };

  const uploadvideofile = () => {
    if (!title) {
      alert("Please enter a title for the video");
      return;
    }
    if (!videofile) {
      alert("Please attach a video file");
      return;
    }
    if (videofile.size > 104857600) {
      // Correct file size check for 50MB
      alert("Please attach a video file smaller than 100mb");
      return;
    }

    const filedata = new FormData();
    filedata.append("file", videofile);
    filedata.append("title", title);
    filedata.append("channel", currentuser?.result?._id);
    filedata.append("uploader", currentuser?.result.name);

    dispatch(uploadvideo({ filedata, fileoption }));
  };

  return (
    <div className="container_VidUpload">
      <input
        type="button"
        value="X"
        className="ibtn_x"
        onClick={() => setVideouploadPage(false)}
      />
      <div className="container2_VidUpload">
        <div className="ibox_div_VidUpload">
          <input
            type="text"
            maxLength={30}
            placeholder="Enter title of your video"
            className="ibox_VidUpload"
            onChange={(e) => setTitle(e.target.value)}
          />
          <label htmlFor="file" className="ibox_cidUpload btn_VidUpload">
            <input
              type="file"
              id="file"
              style={{ fontSize: "1rem" }} // Hide the input, show label
              onChange={handlesetVideofile}
            />
          </label>
        </div>
        <div className="ibox_div_VidUpload">
          <input
            type="button"
            value="Upload"
            onClick={uploadvideofile}
            className="ibox_VidUpload btn_VidUpload"
          />
          <div className="loader ibox_div_VidUpload">
            <CircularProgressbar
              value={progress}
              text={`${progress}%`}
              styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: "round",
                textSize: "16px",
                textAlign: "center", // This centers the text
                pathTransitionDuration: 0.5,
                pathColor: progress > 50 ? "#4caf50" : "#ff9800", // Green for progress > 50%, Orange otherwise
                textColor: "#f88", // White text for visibility in both themes
                trailColor: "#d9d9d9", // Light gray for the trail color
                backgroundColor: "rgb(255, 255, 255)", // Default blue background for the progress; can be adjusted
              })}
            />
          </div>
        </div>
      </div>
      {successMessage && ( // Conditionally render the success message
        <div className="success_message">{successMessage}</div>
      )}
    </div>
  );
}

export default Videoupload;
