import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Plan.css";
import { FaRupeeSign } from "react-icons/fa";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { useSelector } from "react-redux";

function Plan() {
  const navigate = useNavigate();
  const location = useLocation();
  const { videoId, currentTime } = location.state || {};

  // Access the plans array correctly from the Redux state
  const plans = useSelector((state) => state.planreducer);
  // console.log("Available plans:", plans);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Track the download limit and the number of downloads left for non-Gold plans
  const [downloadLimit, setDownloadLimit] = useState(0); // Track the download limit
  const [downloadsLeft, setDownloadsLeft] = useState(1); // Track the remaining downloads for the day

  // Update the download limit when a plan is selected
  useEffect(() => {
    if (selectedPlan) {
      if (selectedPlan.name === "Gold") {
        setDownloadLimit(Infinity); // Unlimited downloads for Gold plan
        setDownloadsLeft(Infinity); // Set to infinity for Gold users
      } else {
        setDownloadLimit(1); // Only 1 download per day for other plans
        setDownloadsLeft(1); // Initially, 1 download left for non-Gold users
      }
    }
  }, [selectedPlan]);

  const handleUpgrade = (plan) => {
    setSelectedPlan(plan);
    navigate("/Plan/Payment", { state: { plan, videoId, currentTime } });
  };

  const formatDuration = (duration) => {
    return duration === 9999999999 ? "Unlimited" : duration; // Transform large number to infinity symbol
  };

  const formatName = (name) => {
    return name === "Free" ? " Free Plan Always Active" : name; // Transform large number to infinity symbol
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="plans_container">
          {plans && plans.length > 0 ? (
            plans.map((plan) => (
              <div className="cardbox" key={plan.name}>
                <div className="plans">
                  <video
                    className="planvideo"
                    src={plan.video}
                    autoPlay
                    loop
                    muted
                  />
                </div>
                <div className="title">
                  <p className="plan">{plan.name} Plan</p>
                  <h1>
                    Watch Duration: {formatDuration(plan.duration)} minutes
                  </h1>
                  <p className="desc">
                    {plan.name} plan allows you to watch videos for{" "}
                    {formatDuration(plan.duration)} minutes.
                  </p>
                  {/* Displaying download limit information inside the card */}
                  <p className="desc">
                    Download limit per day :-{" "}
                    {formatDuration(plan.maxDownloads)}
                  </p>
                  <p>
                    <span className="discountprice">
                      <FaRupeeSign />
                      {plan.price}
                    </span>
                  </p>

                  <button
                    className="upgradePlan"
                    onClick={() => handleUpgrade(plan)}
                  >
                    Upgrade to {formatName(plan.name)}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h1 style={{ color: "var(--text-color)" }}>No plans available</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Plan;
