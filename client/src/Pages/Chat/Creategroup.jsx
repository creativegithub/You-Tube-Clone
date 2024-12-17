import React, { useState } from "react";
import "./Chat.css";
import { useSelector } from "react-redux";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { creategroup } from "../../action/group";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const Creategroup = () => {
  const dispatch = useDispatch();
  const currentuser = useSelector((state) => state.currentuserreducer);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  // const handleCreateGroup = async (event) => {
  //   event.preventDefault();
  //   setErrorMessage(""); // Clear previous errors
  //   setSuccessMessage(""); // Clear previous success message

  //   if (!groupName.trim()) {
  //     setErrorMessage("Group name is required.");
  //     return;
  //   }

  //   if (groupName.length < 3) {
  //     setErrorMessage("Group name must be at least 3 characters.");
  //     return;
  //   }

  //   if (groupDesc.length > 500) {
  //     setErrorMessage("Group description cannot exceed 500 characters.");
  //     return;
  //   }

  //   setLoading(true); // Set loading state
  //   try {
  //     await dispatch(
  //       creategroup({
  //         name: groupName,
  //         desc: groupDesc,
  //         members: [currentuser.result._id],
  //         creatorId: currentuser.result._id,
  //       })
  //     );
  //     setSuccessMessage("Group created successfully!");
  //     navigate(`/groups/${encodeURIComponent(groupName)}/messages`);
  //   } catch (error) {
  //     setErrorMessage("Error creating group. Please try again.");
  //   } finally {
  //     setLoading(false); // Reset loading state
  //   }
  // };

  const handleCreateGroup = async (event) => {
    event.preventDefault();
    setErrorMessage(""); // Clear previous errors
    setSuccessMessage(""); // Clear previous success message

    if (!groupName.trim()) {
      setErrorMessage("Group name is required.");
      return;
    }

    if (groupName.length < 3) {
      setErrorMessage("Group name must be at least 3 characters.");
      return;
    }

    if (groupDesc.length < 3) {
      setErrorMessage("Group description must be at least 3 characters.");
      return;
    }

    if (groupDesc.length > 500) {
      setErrorMessage("Group description cannot exceed 500 characters.");
      return;
    }

    setLoading(true); // Set loading state
    try {
      await dispatch(
        creategroup({
          name: groupName,
          desc: groupDesc,
          members: [currentuser.result._id],
          creatorId: currentuser.result._id,
        })
      );
      setSuccessMessage("Group created successfully!");
      navigate(`/groups/${encodeURIComponent(groupName)}/messages`);
    } catch (error) {
      setErrorMessage(
        error.message || "Error creating group. Please try again."
      );
      console.error("Error creating group:", error); // Log the detailed error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="JoinPage">
          <div className="JoinContainer">
            <h1>CREATE YOUR GROUP</h1>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <form onSubmit={handleCreateGroup}>
              <label htmlFor="groupName">
                <p className="joinDetail">Group Name</p>
                <input
                  id="groupName"
                  type="text"
                  placeholder="Group name..."
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  className="joinInput"
                  required
                />
              </label>
              <label htmlFor="groupDesc">
                <p className="joinDetail">Group Description</p>
                <input
                  id="groupDesc"
                  type="text"
                  placeholder="Group description..."
                  value={groupDesc}
                  onChange={(e) => setGroupDesc(e.target.value)}
                  className="joinInput"
                  required
                />
              </label>
              <br />
              <button type="submit" className="createBtn" disabled={loading}>
                {loading ? "Creating..." : "Create Group"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creategroup;
