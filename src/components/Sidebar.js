import { Avatar, IconButton, Menu, MenuItem, Modal } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatItem from "./ChatItem";
import React, { useState } from "react";
import { useStateValue } from "../StateProvider";
// import Path from "path";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line
  const [{ user }, dispatch] = useStateValue();
  const history = useHistory();

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

  const logoutUser = (event) => {
    dispatch({
      type: "USER",
      user: null,
      token: "",
    });
    history.replace("/login");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={"http://localhost:4000/" + user?.profile_pic} alt="" />
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
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
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
                <h4>Room Image</h4>
                <input type="file" />
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
