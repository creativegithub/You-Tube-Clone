import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaPeopleGroup } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { useDispatch, useSelector } from "react-redux";
import { deletegroup, addmember } from "../../action/group";
import { BsHeartArrow } from "react-icons/bs";

const Grouplist = () => {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groupreducer.groups);
  const currentuser = useSelector((state) => state.currentuserreducer);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // console.log(groups);

  const handleDeleteGroup = async (groupName) => {
    if (
      window.confirm(`Are you sure you want to delete the group: ${groupName}?`)
    ) {
      setLoading(true);
      setError("");
      try {
        // Make sure that the group name is passed correctly to the deletegroup action
        await dispatch(deletegroup(groupName));
      } catch (error) {
        console.error("Failed to delete group:", error);
        setError("Failed to delete the group. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleJoinGroup = async (groupName) => {
    const isMember = groups
      .find((g) => g.name === groupName)
      ?.members.includes(currentuser.result._id);

    if (isMember) {
      alert(`You are already a member of the group: ${groupName}`);
      return;
    }

    try {
      await dispatch(
        addmember(groupName, { memberId: currentuser.result._id })
      );
    } catch (error) {
      console.error("Error adding member:", error);
    }
  };

  return (
    <div className="container_Pages_App">
      <Leftsidebar />
      <div className="container2_Pages_App">
        <div className="groupContainer">
          {!currentuser || !currentuser.result.name ? (
            <h2>Please log in to join or create the group.</h2>
          ) : (
            <>
              <h2>CREATED GROUPS</h2>
              {groups.length === 0 ? (
                <div className="groupDetail">
                  <p>
                    No groups available. Click the button below to create a new
                    group.
                  </p>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/groups/create"}
                  >
                    <button className="createGroupBtn">Create New Group</button>
                  </Link>
                </div>
              ) : (
                <ul className="groupLists">
                  {groups.map((group) => {
                    const isMember = group.members.includes(
                      currentuser.result._id
                    );
                    return (
                      <li className="groupList" key={group.name}>
                        <strong>{group.name} </strong>{" "}
                        <BsHeartArrow size={48} />
                        <p>{group.desc}</p>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/groups/${encodeURIComponent(
                            group.name
                          )}/messages`}
                        >
                          <button
                            className="joinBtn"
                            onClick={() =>
                              isMember ? null : handleJoinGroup(group.name)
                            }
                            disabled={loading}
                          >
                            <FaPeopleGroup />{" "}
                            {isMember ? "Join Chat" : "Join Group"}
                          </button>
                        </Link>
                        {currentuser.result._id === group.creatorId && (
                          <button
                            className="deleteBtn"
                            onClick={() => handleDeleteGroup(group.name)}
                            aria-label={`Delete group ${group.name}`}
                            disabled={loading}
                          >
                            <RiDeleteBin5Line />
                          </button>
                        )}
                      </li>
                    );
                  })}
                  <Link
                    style={{ textDecoration: "none" }}
                    to={"/groups/create"}
                  >
                    <button className="createGroupBtn">Create New Group</button>
                  </Link>
                </ul>
              )}
              {loading && (
                <div style={{ color: "var(--text-color)" }}>Loading...</div>
              )}
              {error && <div className="error">{error}</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grouplist;
