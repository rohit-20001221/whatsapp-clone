import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState, useRef } from "react";
import "./Chat.css";
// import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";

function Chat() {
  const [emojiPicker, setEmojiPicker] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const filePicker = useRef(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onEmojiClick = (event, emojiObject) => {
    const message_ = message + emojiObject.emoji;
    setMessage(message_);
  };

  const handleChangeInput = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h4>Room1</h4>
        </div>
        <div className="chat__headerIcons">
          {/* <IconButton>
            <SearchIcon />
          </IconButton> */}
          <IconButton
            onClick={() => {
              filePicker.current.click();
            }}
          >
            <AttachFileIcon />
          </IconButton>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Room Info</MenuItem>
          </Menu>
        </div>
        <input hidden type="file" ref={filePicker} />
      </div>
      <div className="chat__body">
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage isReceiver={true} />
        <ChatMessage isReceiver={true} />
        <ChatMessage isReceiver={true} />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage />
        <ChatMessage isReceiver={true} />
        <ChatMessage />
        <ChatMessage isReceiver={true} />
        <ChatMessage />
        <ChatMessage isReceiver={true} />
        <ChatMessage isReceiver={true} />
      </div>

      <div className="chat__footer">
        <div className="chat__emoji">
          <IconButton
            onClick={() => {
              setEmojiPicker(!emojiPicker);
            }}
          >
            <SentimentVerySatisfiedOutlinedIcon />
          </IconButton>
        </div>

        <form>
          <input value={message} onChange={handleChangeInput} type="text" />
          <IconButton>
            <TelegramIcon />
          </IconButton>
        </form>
      </div>
      <div className="emoji__picker" hidden={emojiPicker}>
        <Picker onEmojiClick={onEmojiClick} />
      </div>
    </div>
  );
}

export default Chat;
