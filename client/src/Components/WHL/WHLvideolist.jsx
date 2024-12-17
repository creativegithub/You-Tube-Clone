import React from "react";
import Showvideolist from "../Showvideolist/Showvideolist";

const WHLvideolist = ({ page, currentuser, videolist }) => {
  // console.log(currentuser);

  return (
    <>
      {currentuser ? (
        <>
          {videolist?.data
            ?.filter((q) => q?.viewer === currentuser)
            .reverse()
            .map((m) => {
              // console.log(m);
              return (
                <div key={m?._id}>
                  <Showvideolist videoid={m?.videoid} />
                </div>
              );
            })}
        </>
      ) : (
        <>
          <h2 style={{ color: "var(--text-color)" }}>
            Plz login to Watch your {page}
          </h2>
        </>
      )}
    </>
  );
};

export default WHLvideolist;
