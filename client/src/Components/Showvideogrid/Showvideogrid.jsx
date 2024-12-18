import React from "react";
import "./Showvideogrid.css";
import Showvideo from "../Showvideo/Showvideo";

function Showvideogrid({ vid }) {
  return (
    <div className="Container_ShowVideoGrid">
      {vid?.map((vi) => {
        return (
          <div key={vi._id} className="video_box_app">
            <Showvideo vid={vi} />
          </div>
        );
      })}
    </div>
  );
}

export default Showvideogrid;
