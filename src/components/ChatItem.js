import { Avatar } from "@material-ui/core";
import React from "react";
import "./ChatItem.css";

function ChatItem() {
  return (
    <div className="chatItem">
      <Avatar />
      <p className="chatItem__name">Room 1</p>
    </div>
  );
}

export default ChatItem;
