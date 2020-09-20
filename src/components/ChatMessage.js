import React from "react";
import "./ChatMessage.css";

function ChatMessage({ name, text, created_at, isReceiver, image }) {
  return (
    <div
      className={
        isReceiver ? "chatMessage chatMessage__receiver" : "chatMessage"
      }
    >
      <p className="chatMessage__user">{name}</p>
      <img hidden={!image} className="chatMessage__image" alt="" src={image} />
      <p>
        <span className="chatMessage__message">{text}</span>
        <span className="chatMessage__time">{created_at}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
