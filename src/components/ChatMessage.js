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
        <span className="chatMessage__message">
          ante monna oka anna valatho hackathon lo participate chesa ga ah anna
          work chestuna company lo nodejs ki internship undhi ante anduke target
          petukuna ante monna oka anna valatho hackathon lo participate chesa ga
          ah anna work chestuna company lo nodejs ki internship undhi ante
          anduke target petukuna
        </span>
        <span className="chatMessage__time">{new Date().toDateString()}</span>
      </p>
    </div>
  );
}

export default ChatMessage;
