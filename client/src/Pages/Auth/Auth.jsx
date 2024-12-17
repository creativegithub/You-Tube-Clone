import React from "react";
import "./Auth.css";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { setcurrentuser } from "../../action/currentuser";
import { useDispatch } from "react-redux";

function Auth({ user, setauthbtn, seteditcreatechannelbtn }) {
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setcurrentuser(null));
    localStorage.clear();
    googleLogout();
  };

  return (
    <div className="Auth_container" onClick={() => setauthbtn(false)}>
      <div className="Auth_container2">
        <div className="User_Details">
          <div className="Channel_logo_App">
            <p className="fstChar_logo_App">
              {user?.result.name ? (
                <>{user?.result.name.charAt(0).toUpperCase()}</>
              ) : (
                <>{user?.result.email.charAt(0).toUpperCase()}</>
              )}
            </p>
          </div>
          <div className="email_Auth">{user?.result.email}</div>
          <div>{user?.result.city}</div> {/* Display the city here */}
        </div>
        <div className="btns_Auth">
          {user?.result.name ? (
            <Link to={`/channel/${user?.result?._id}`} className="btn_Auth">
              Your Channel
            </Link>
          ) : (
            <input
              type="submit"
              value="Create Your Own Channel"
              className="btn_Auth"
              onClick={() => seteditcreatechannelbtn(true)}
            />
          )}
        </div>
        <div className="btn_Auth" onClick={() => logout()}>
          <BiLogOut />
          Log Out
        </div>
      </div>
    </div>
  );
}

export default Auth;
