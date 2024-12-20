import React from "react";
import "./Leftsidebar.css";
import { AiFillLike, AiFillPlaySquare, AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
  MdOutlineWatchLater,
} from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { FaHistory, FaDownload } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Drawersidebar({ toggleDrawer, toggleDrawerSidebar }) {
  return (
    <div className="container_DrawerLeftSidebar" style={toggleDrawerSidebar}>
      <div className="container2_DrawerLeftSidebar">
        <div className="Drawer_leftSidebar">
          <NavLink to={"/"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <AiOutlineHome
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Home</div>
            </div>
          </NavLink>
          <NavLink to={"/Explore"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <MdOutlineExplore
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Explore</div>
            </div>
          </NavLink>
          <NavLink to={"/Shorts"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <SiYoutubeshorts
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Shorts</div>
            </div>
          </NavLink>
          <NavLink to={"/Plan"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <MdOutlineSubscriptions
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Subscriptions</div>
            </div>
          </NavLink>
        </div>
        <div className="libraryBtn_Drawerleftsidebar">
          <NavLink to={"/Library"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <MdOutlineVideoLibrary
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Library</div>
            </div>
          </NavLink>
          <NavLink to={"/Watchhistory"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <FaHistory
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">History</div>
            </div>
          </NavLink>
          <NavLink to={"/Yourvideos"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <AiFillPlaySquare
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Your Video</div>
            </div>
          </NavLink>
          <NavLink to={"/Watchlater"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <MdOutlineWatchLater
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Watch Later</div>
            </div>
          </NavLink>
          <NavLink to={"/Likedvideos"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <AiFillLike
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Liked Videos</div>
            </div>
          </NavLink>
          <NavLink to={"/Downloadedvideos"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <FaDownload
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Downloaded Videos</div>
            </div>
          </NavLink>
          <NavLink to={"/Groups"} className="icon_sidebar_div">
            <div className="icon_sidebar_div_menu">
              <IoMdChatboxes
                size={22}
                className={"icon_sidebar"}
                style={{ margin: "auto .7rem" }}
              />
              <div className="text_sidebar_icon">Chat</div>
            </div>
          </NavLink>
        </div>
        <div className="subScriptions_lsdbar">
          <h3>Your Subscriptions</h3>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Channel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Channel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Channel</div>
          </div>
          <div className="chanel_lsdbar">
            <p>C</p>
            <div>Channel</div>
          </div>
        </div>
      </div>
      <div
        className="container3_DrawerLeftSidebar"
        onClick={() => toggleDrawer()}
      ></div>
    </div>
  );
}

export default Drawersidebar;
