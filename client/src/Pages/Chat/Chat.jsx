import React, { useEffect, useRef, useState } from "react";
import Message from "./Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import { HiUserGroup } from "react-icons/hi2";
import { HiArrowSmLeft } from "react-icons/hi";
import { IoCloseSharp } from "react-icons/io5";
import { VscSend } from "react-icons/vsc";
import { Link, useNavigate, useParams } from "react-router-dom";
import Leftsidebar from "../../Components/Leftsidebar/Leftsidebar";
import { useDispatch, useSelector } from "react-redux";
import { sendmessage, fetchmessages, deletemessage } from "../../action/group"; // Import the removeMessage action
import io from "socket.io-client";

const Chat = () => {
  const navigate = useNavigate();
  const { groupName } = useParams();
  const currentuser = useSelector((state) => state.currentuserreducer);
  const messages = useSelector((state) => state.groupreducer.messages); // Default to an empty array if not found
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const socketRef = useRef();
  const [loading, setLoading] = useState(false);

  // console.log("Messages :-", messages);

  useEffect(() => {
    socketRef.current = io("http://localhost:5000");

    socketRef.current.emit("joinGroup", groupName);

    socketRef.current.on("receiveMessage", (message) => {
      dispatch(sendmessage(message)); // Update Redux store
    });

    // Optionally handle server response in case of failure
    socketRef.current.on("messageDeleted", (updatedMessages) => {
      dispatch(deletemessage(groupName, updatedMessages)); // Update Redux store after server confirms
    });

    const loadMessages = async () => {
      setLoading(true);
      await dispatch(fetchmessages(groupName)); // Fetch messages from the backend
      setLoading(false);
    };

    loadMessages();

    return () => {
      socketRef.current.disconnect();
    };
  }, [groupName, dispatch]);

  const send = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: currentuser.result._id,
        user: currentuser.result.name,
        message: inputValue,
        timestamp: new Date(),
      };

      setLoading(true);
      try {
        socketRef.current.emit("sendMessage", {
          groupName,
          user: currentuser.result.name,
          message: inputValue,
        });

        dispatch(sendmessage(groupName, newMessage)); // Dispatch action to update Redux store

        setInputValue("");
        setError("");
      } catch (error) {
        setError("Error sending message. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      setError("Message cannot be empty.");
    }
  };

  const deleteMessage = (messageId) => {
    // Optimistically remove the message from the UI
    const updatedMessages = messages.filter((msg) => msg._id !== messageId);
    dispatch(deletemessage(groupName, updatedMessages)); // Update Redux state with the updated list

    socketRef.current.emit("deleteMessage", { groupName, messageId }); // Emit delete message event to server
  };

  return (
    <div className="container_Pages_App">
      <>
        <Leftsidebar />
        <div className="container2_Pages_App">
          <div className="chatPage">
            <div className="chatContainer">
              <div className="header">
                <Link to="/Groups">
                  <HiArrowSmLeft className="closeIcon" />
                </Link>
                <h2>
                  <HiUserGroup className="personsIcon" /> {groupName}
                </h2>
                <Link to="/">
                  <IoCloseSharp className="closeIcon" />
                </Link>
              </div>
              <ReactScrollToBottom className="chatBox" aria-live="polite">
                {messages.length > 0 ? (
                  messages.map((item) => (
                    <Message
                      key={item._id}
                      user={item.user}
                      message={`${item.message} (${new Date(
                        item.timestamp
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })})`}
                      classs={
                        item.user === currentuser?.result?.name
                          ? "right"
                          : "left"
                      }
                      messageId={item._id}
                      onDelete={() => deleteMessage(item._id)}
                      currentUserName={currentuser?.result?.name}
                    />
                  ))
                ) : (
                  <div>No messages available.</div>
                )}
                {loading && (
                  <div style={{ color: "black" }}>Loading messages...</div>
                )}
              </ReactScrollToBottom>
              <div className="inputBox">
                <input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(event) =>
                    event.key === "Enter" ? send() : null
                  }
                  type="text"
                  id="chatInput"
                  placeholder="Type a message..."
                  aria-label="Chat input"
                />
                <button
                  onClick={send}
                  className="sendBtn"
                  aria-label="Send message"
                  disabled={loading}
                >
                  <VscSend className="sendIcon" />
                </button>
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Chat;
