import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiUserCircle } from "react-icons/bi";
import Searchbar from "./Searchbar/Searchbar";
import { jwtDecode } from "jwt-decode";
import Auth from "../../Pages/Auth/Auth"; // Ensure Auth supports Google Login
import { setcurrentuser } from "../../action/currentuser";
import Videocallbtn from "../../Pages/VideoCall/Videocallbtn";

const Navbar = ({ toggleDrawer, seteditcreatechannelbtn }) => {
  const [authbtn, setauthbtn] = useState(false);
  const [videocallbtn, setvideocallbtn] = useState(false);
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuserreducer);

  const logout = () => {
    dispatch(setcurrentuser(null));
    localStorage.clear();
  };

  useEffect(() => {
    const token = currentuser?.token;
    if (token) {
      const decodetoken = jwtDecode(token);
      if (decodetoken.exp * 1000 < Date.now()) {
        logout();
      }
    }
  }, [currentuser]);

  return (
    <>
      <div className={`container_Navbar ${currentuser?.result?.theme}`}>
        <div className="Burger_Logo_Navbar">
          <div className="burger" onClick={toggleDrawer}>
            <p></p>
            <p></p>
            <p></p>
          </div>
          <Link to="/" className="logo_div_Navbar">
            <img src={logo} style={{ width: "3rem" }} alt="Logo" />
            <p className="logo_title_Navbar">Your-Tube</p>
          </Link>
        </div>
        <Searchbar />
        <RiVideoAddLine
          size={22}
          className="vid_bell_Navbar"
          onClick={() => setvideocallbtn(true)}
        />
        <div className="apps_Box">
          {[...Array(9)].map((_, index) => (
            <p key={index} className="appBox"></p>
          ))}
        </div>
        <IoMdNotificationsOutline size={22} className="vid_bell_Navbar" />
        <div className="Auth_cont_Navbar">
          {currentuser?.result ? (
            <div className="Channel_logo_App" onClick={() => setauthbtn(true)}>
              <p className="fstChar_logo_App">
                {currentuser.result.name.charAt(0).toUpperCase()}
              </p>
            </div>
          ) : (
            <Link to="/Signin" className="Auth_Btn">
              <BiUserCircle size={22} />
              <b>Sign in</b>
            </Link>
          )}
        </div>
      </div>
      {authbtn && (
        <Auth
          seteditcreatechannelbtn={seteditcreatechannelbtn}
          setauthbtn={setauthbtn}
          user={currentuser}
        />
      )}
      {videocallbtn && (
        <Videocallbtn setvideocallbtn={setvideocallbtn} user={currentuser} />
      )}
    </>
  );
};

export default Navbar;
