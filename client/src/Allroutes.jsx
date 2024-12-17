import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Channel from "./Pages/Channel/Channel";
import Search from "./Pages/Search/Search";
import Library from "./Pages/Library/Library";
import Yourvideo from "./Pages/Yourvideo/Yourvideo";
import Watchhistory from "./Pages/Watchhistory/Watchhistory";
import Watchlater from "./Pages/Watchlater/Watchlater";
import Likedvideo from "./Pages/Likedvideo/Likedvideo";
import Videopage from "./Pages/Videopage/Videopage";
import Chat from "./Pages/Chat/Chat";
import Creategroup from "./Pages/Chat/Creategroup";
import Grouplist from "./Pages/Chat/Grouplist";
import Plan from "./Pages/Plan/Plan";
import Paymentpage from "./Pages/Plan/Paymentpage";
import Downloadvideo from "./Pages/Downloadvideo/Downloadvideo";
import SignIn from "./Pages/Auth/SignIn";
import VideoCall from "./Pages/VideoCall/VideoCall";

function Allroutes({ seteditcreatechannelbtn, setVideouploadPage }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/channel/:cid"
        element={
          <Channel
            seteditcreatechannelbtn={seteditcreatechannelbtn}
            setVideouploadPage={setVideouploadPage}
          />
        }
      />
      <Route path="/search/:Searchquery" element={<Search />} />
      <Route path="/Signin" element={<SignIn />} />
      <Route path="/call/:callerId/:callerName/:role" element={<VideoCall />} />
      <Route path="/Library" element={<Library />} />
      <Route path="/Watchhistory" element={<Watchhistory />} />
      <Route path="/Yourvideos" element={<Yourvideo />} />
      <Route path="/Watchlater" element={<Watchlater />} />
      <Route path="/Likedvideos" element={<Likedvideo />} />
      <Route path="/Videopage/:vid" element={<Videopage />} />
      <Route path="/Groups/create" element={<Creategroup />} />
      <Route path="/Groups" element={<Grouplist />} />
      <Route path="/Groups/:groupName/messages" element={<Chat />} />
      <Route path="/Plan" element={<Plan />} />
      <Route path="/Plan/Payment" element={<Paymentpage />} />
      <Route path="/Downloadedvideos" element={<Downloadvideo />} />
    </Routes>
  );
}

export default Allroutes;
