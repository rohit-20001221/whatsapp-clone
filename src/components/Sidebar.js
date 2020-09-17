import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatItem from "./ChatItem";
import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={""} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon className="header__icon" />
          </IconButton>
          <IconButton>
            <ChatIcon className="header__icon" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="header__icon" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchIcon />
        <input placeholder="search or start new chat" type="text" />
      </div>
      <div className="sidebar__chats">
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
}

export default Sidebar;
