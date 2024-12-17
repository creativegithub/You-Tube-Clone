import React from "react";
import { Link } from "react-router-dom";

function Videocallbtn({ user, setvideocallbtn }) {
  // Check if the user is available
  const isUserAvailable = user && user.result && user.result._id;

  return (
    <div className="Auth_container" onClick={() => setvideocallbtn(false)}>
      {isUserAvailable ? (
        <Link
          to={`/call/${user.result._id}/${user.result.name}/host`}
          className="Auth_container2"
        >
          Want to 'Go Live' with your friends click here
        </Link>
      ) : (
        <p className="Auth_container2">Please Sign In to 'Go Live'</p>
      )}
    </div>
  );
}

export default Videocallbtn;
