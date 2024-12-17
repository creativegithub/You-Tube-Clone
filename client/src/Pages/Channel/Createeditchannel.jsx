import React, { useState } from "react";
import "./Createeditchannel.css";
import { updatechanneldata } from "../../action/channeluser";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../action/auth";

function Createeditchannel({ seteditcreatechannelbtn }) {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuserreducer);
  const [name, setName] = useState(currentuser?.result.name || "");
  const [desc, setDesc] = useState(currentuser?.result?.desc || "");

  // console.log(name, desc, currentuser);

  const handleSubmit = () => {
    if (!name) {
      alert("Please enter Name !!");
    } else if (!desc) {
      alert("Please enter Description ");
    } else {
      dispatch(
        updatechanneldata(currentuser?.result._id, { name: name, desc: desc })
      );
      seteditcreatechannelbtn(false);
      setTimeout(() => {
        dispatch(login({ email: currentuser.result.email }));
      }, 5000);
    }
  };

  return (
    <div className="container_CreateEditChanel">
      <input
        type="submit"
        value={"X"}
        className="ibtn_x"
        onClick={() => seteditcreatechannelbtn(false)}
      />
      <div className="container2_CreateEditChanel">
        <h1>
          {currentuser?.result?.name ? <>Edit</> : <>Create</>} Your Channel{" "}
        </h1>
        <input
          type="text"
          placeholder="Enter Your/Channel Name"
          name="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="ibox"
        />
        <textarea
          type="text"
          rows={15}
          placeholder="Enter Channel Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="ibox"
        ></textarea>
        <input
          type="submit"
          value={"Submit"}
          onClick={handleSubmit}
          className="ibtn"
        />
      </div>
    </div>
  );
}

export default Createeditchannel;
