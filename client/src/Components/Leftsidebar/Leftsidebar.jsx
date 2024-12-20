import React from "react";
import "./Leftsidebar.css";
import { AiOutlineHome } from "react-icons/ai";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import { IoMdChatboxes } from "react-icons/io";
import { SiYoutubeshorts } from "react-icons/si";
import { NavLink } from "react-router-dom";

function Leftsidebar() {
  return (
    <div className="container_leftSidebar">
      <NavLink to={"/"} className="icon_sidebar_div">
        <AiOutlineHome size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Home</div>
      </NavLink>
      <div className="icon_sidebar_div">
        <MdOutlineExplore size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Explore</div>
      </div>
      <div className="icon_sidebar_div">
        <SiYoutubeshorts size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Shorts</div>
      </div>
      <NavLink to={"/Plan"} className="icon_sidebar_div">
        <MdOutlineSubscriptions size={22} className="icon_sidebar" />
        <div
          className="text_sidebar_icon"
          style={{ fontSize: "10px", padding: "0" }}
        >
          Subsrciptions
        </NavLink>
      </div>
      <NavLink to={"/Library"} className="icon_sidebar_div">
        <MdOutlineVideoLibrary size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Library</div>
      </NavLink>
      <NavLink to={"/Groups"} className="icon_sidebar_div">
        <IoMdChatboxes size={22} className="icon_sidebar" />
        <div className="text_sidebar_icon">Chat</div>
      </NavLink>
    </div>
  );
}

export default Leftsidebar;
