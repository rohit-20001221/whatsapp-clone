import { Avatar } from "@material-ui/core";
import React from "react";
import "./ChatItem.css";
import { useStateValue } from "../StateProvider";

function ChatItem({ image, name, id }) {
  // eslint-disable-next-line
  const [{}, dispatch] = useStateValue();

  return (
    <div
      onClick={() => {
        dispatch({ type: "CHANGE_ROOM", id: id });
      }}
      className="chatItem"
    >
      <Avatar src={image} />
      <p className="chatItem__name">{name}</p>
    </div>
  );
}

export default ChatItem;
