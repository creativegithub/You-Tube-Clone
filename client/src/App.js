import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Allroutes from "./Allroutes";
import Drawersidebar from "./Components/Leftsidebar/Drawersidebar";
import Createeditchannel from "./Pages/Channel/Createeditchannel";
import Videoupload from "./Pages/Videoupload/Videoupload";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchallchannel } from "./action/channeluser";
import { getallvideo } from "./action/video";
import { getallcomment } from "./action/comment";
import { getallhistory } from "./action/history";
import { getalllikedvideo } from "./action/likedvideo";
import { getallwatchlater } from "./action/watchlater";
import { getallgroups } from "./action/group";
import { fetchPlans } from "./action/plan";
import { getAllDownloadedVideo } from "./action/downloadvideo";

function App() {
  const [toggleDrawerSidebar, setToggleDrawerSidebar] = useState({
    display: "none",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all independent actions concurrently using Promise.all
        await Promise.all([
          dispatch(fetchallchannel()),
          dispatch(getallvideo()),
          dispatch(getallcomment()),
          dispatch(getallhistory()),
          dispatch(getalllikedvideo()),
          dispatch(getallwatchlater()),
          dispatch(getallgroups()),
        ]);

        // Sequential dispatch for actions that depend on each other (if any)
        await dispatch(fetchPlans());
        await dispatch(getAllDownloadedVideo());
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle errors appropriately (e.g., set error state or show a toast)
      }
    };

    fetchData();
  }, [dispatch]);

  const toggleDrawer = () => {
    if (toggleDrawerSidebar.display === "none") {
      setToggleDrawerSidebar({
        display: "flex",
      });
    } else {
      setToggleDrawerSidebar({
        display: "none",
      });
    }
  };

  const [editcreatechannelbtn, seteditcreatechannelbtn] = useState(false);
  const [videouploadPage, setVideouploadPage] = useState(false);

  return (
    <Router>
      {videouploadPage && (
        <Videoupload setVideouploadPage={setVideouploadPage} />
      )}
      {editcreatechannelbtn && (
        <Createeditchannel seteditcreatechannelbtn={seteditcreatechannelbtn} />
      )}
      <Navbar
        toggleDrawer={toggleDrawer}
        seteditcreatechannelbtn={seteditcreatechannelbtn}
      />
      <Drawersidebar
        toggleDrawer={toggleDrawer}
        toggleDrawerSidebar={toggleDrawerSidebar}
      />
      <Allroutes
        seteditcreatechannelbtn={seteditcreatechannelbtn}
        setVideouploadPage={setVideouploadPage}
      />
    </Router>
  );
}

export default App;
