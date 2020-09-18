import { Avatar, IconButton, Menu, MenuItem, Modal } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatItem from "./ChatItem";
import React, { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const createRoom = (event) => {
    event.preventDefault();
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={""} />
        <div className="sidebar__headerRight">
          <IconButton title="join room">
            <AddCircleIcon className="header__icon" />
          </IconButton>
          <IconButton title="create room" onClick={openModal}>
            <ChatIcon className="header__icon" />
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon className="header__icon" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
          <Modal
            className="sidebar__modal"
            open={modalOpen}
            onClose={handleModalClose}
          >
            <div className="sidebar__createRoom">
              <h3>create room!!</h3>
              <form onSubmit={createRoom}>
                <h4>Room Name</h4>
                <input type="text" />
                <button type="submit">create room</button>
              </form>
            </div>
          </Modal>
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
