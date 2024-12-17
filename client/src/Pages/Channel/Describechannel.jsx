import React from "react";
import "./Describechannel.css";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useSelector } from "react-redux";

function Describechannel({ cid, seteditcreatechannelbtn, setVideouploadPage }) {
  // const channel = [
  //   {
  //     _id: 1,
  //     name: "abcjabsc",
  //     email: "xyz@gmail.com",
  //     joinedon: "2022-07-134",
  //     desc: "CreativeHub",
  //   },
  // ];
  const channel = useSelector((state) => state.channelreducer);

  const currentchannel = channel.filter((c) => c._id === cid)[0];

  const currentuser = useSelector((state) => state.currentuserreducer);

  return (
    <div className="container3_chanel">
      <div className="chanel_logo_chanel">
        <b>{currentchannel?.name.charAt(0).toUpperCase()}</b>
      </div>
      <div className="description_chanel">
        <b>{currentchannel?.name}</b>
        <p>{currentchannel?.desc}</p>
      </div>
      {currentuser?.result._id === currentchannel?._id && (
        <>
          <p
            className="editbtn_chanel"
            onClick={() => seteditcreatechannelbtn(true)}
          >
            <FaEdit />
            <b>Edit Channel</b>
          </p>
          <p
            className="uploadbtn_chanel"
            onClick={() => setVideouploadPage(true)}
          >
            <FaUpload />
            <b>Upload Video</b>
          </p>
        </>
      )}
    </div>
  );
}

export default Describechannel;
