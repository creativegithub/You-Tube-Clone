import React from "react";
import PropTypes from "prop-types";
import { AiTwotoneDelete } from "react-icons/ai";
import "./Message.css";

const Message = ({
  user = "Anonymous",
  message,
  classs = "",
  messageId,
  onDelete,
  currentUserName,
}) => {
  const messageLabel = `${user}: ${message}`;

  return (
    <div
      className={`messageBox ${classs}`}
      aria-label={messageLabel}
      role="listitem" // Added role for better accessibility
    >
      <span className="messageUser">{user}:</span>{" "}
      <span className="messageContent">{message}</span>
      {user === currentUserName && (
        <button className="delete-btn" onClick={() => onDelete(messageId)}>
          <AiTwotoneDelete size={22} />
        </button>
      )}
    </div>
  );
};

Message.propTypes = {
  user: PropTypes.string,
  message: PropTypes.string.isRequired,
  classs: PropTypes.string,
  messageId: PropTypes.string.isRequired, // Make sure this is passed correctly
  onDelete: PropTypes.func.isRequired,
};

export default Message;
