import { Avatar, IconButton, Menu, MenuItem, Modal } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import ChatItem from "./ChatItem";
import React, { useState, useRef } from "react";
import { useStateValue } from "../StateProvider";
// import Path from "path";
import "./Sidebar.css";
import { useHistory } from "react-router-dom";
import url from "../server";

function Sidebar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  // eslint-disable-next-line
  const [{ user, token, rooms }, dispatch] = useStateValue();
  const history = useHistory();

  //create room variables
  const [roomName, setRoomName] = useState("");
  const roomImageRef = useRef();

  //join room variables
  const [roomID, setRoomID] = useState("");

  //close menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  //close create room modal
  const handleModalClose = () => {
    setModalOpen(false);
  };

  //open create room modal
  const openModal = () => {
    setModalOpen(true);
  };

  //open join room modal
  const openJoinModal = () => {
    setJoinModalOpen(true);
  };

  //close join room modal
  const closeJoinModal = () => {
    setJoinModalOpen(false);
  };

  //join room
  const joinRoom = (event) => {
    event.preventDefault();
    console.log(roomID);
    const data = {
      room_id: roomID,
    };
    const headers = new Headers();
    headers.append("authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    fetch(`${url}/api/add/room`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "USER",
          user: data.user,
          token: token,
        });
        closeJoinModal();
      });
  };

  //create room
  const createRoom = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const headers = new Headers();

    headers.append("authorization", `Bearer ${token}`);

    fd.append("room_name", roomName);
    // fd.append("token", token);
    fd.append("room_image", roomImageRef.current.files[0]);

    console.log(token);
    fetch(`${url}/api/create/room`, {
      method: "POST",
      body: fd,
      headers: headers,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("cant create room");
        }
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        dispatch({
          type: "USER",
          user: data?.user,
          token: token,
        });
        console.log(user);
        handleModalClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logoutUser = (event) => {
    dispatch({
      type: "LOGOUT",
    });
    history.replace("/login");
  };

  const renderRooms = () => {
    if (rooms) {
      return rooms.map((item) => {
        return (
          <ChatItem
            key={item._id}
            name={item.room_name}
            image={url + item.room_image}
            id={item._id}
          />
        );
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={url + user?.profile_pic} alt="" />
        <div className="sidebar__headerRight">
          <IconButton onClick={openJoinModal} title="join room">
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
            {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
          {/* Create Room */}
          <Modal
            className="sidebar__modal"
            open={modalOpen}
            onClose={handleModalClose}
          >
            <div className="sidebar__createRoom">
              <h3>create room!!</h3>
              <form onSubmit={createRoom}>
                <h4>Room Name</h4>
                <input
                  onChange={(e) => setRoomName(e.target.value)}
                  type="text"
                />
                <h4>Room Image</h4>
                <input ref={roomImageRef} type="file" />
                <button type="submit">create room</button>
              </form>
            </div>
          </Modal>
          {/* Join Room */}
          <Modal
            className="sidebar__modal"
            open={joinModalOpen}
            onClose={closeJoinModal}
          >
            <div className="sidebar__createRoom">
              <h3>join room!!</h3>
              <form onSubmit={joinRoom}>
                <h4>Room ID</h4>
                <input
                  value={roomID}
                  onChange={(e) => setRoomID(e.target.value)}
                  type="text"
                />
                <button type="submit">join room</button>
              </form>
            </div>
          </Modal>
        </div>
      </div>
      <div className="sidebar__search">
        <SearchIcon />
        <input placeholder="search or start new chat" type="text" />
      </div>
      <div className="sidebar__chats">{renderRooms()}</div>
    </div>
  );
}

export default Sidebar;
