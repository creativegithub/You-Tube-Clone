import React from "react";
import "./WHL.css";
import Leftsidebar from "../Leftsidebar/Leftsidebar";
import WHLvideolist from "./WHLvideolist";
import { useDispatch, useSelector } from "react-redux";
import { clearhistory } from "../../action/history";

function WHL({ page, videolist }) {
  const dispatch = useDispatch();

  const currentuser = useSelector((state) => state.currentuserreducer);

  // console.log(videolist);

  const handleclearhistory = () => {
    if (currentuser) {
      dispatch(
        clearhistory({
          userId: currentuser?.result._id,
        })
      );
    }
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="container_WHL">
          <div className="box_WHL leftside_WHL">
            <b>Your {page} Shown Here</b>
            {page === "History" && (
              <div className="clear_History_btn" onClick={handleclearhistory}>
                Clear History
              </div>
            )}
          </div>
          <div className="rightside_WHL">
            <h1>{page}</h1>
            <div className="WHL_list">
              <WHLvideolist
                page={page}
                currentuser={currentuser?.result._id}
                videolist={videolist}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WHL;
