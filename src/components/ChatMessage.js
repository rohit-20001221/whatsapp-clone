import React from "react";
import "./ChatMessage.css";

function ChatMessage({ isReceiver }) {
  return (
    <div
      className={
        isReceiver ? "chatMessage chatMessage__receiver" : "chatMessage"
      }
    >
      <p className="chatMessage__user">Rohit</p>
      <p>
        <span className="chatMessage__message">this is a message</span>
        <span className="chatMessage__time">{new Date().toDateString()}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
