import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
// import SearchIcon from "@material-ui/icons/Search";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentVerySatisfiedOutlinedIcon from "@material-ui/icons/SentimentVerySatisfiedOutlined";
import TelegramIcon from "@material-ui/icons/Telegram";
import ChatMessage from "./ChatMessage";
import Picker from "emoji-picker-react";
import { useStateValue } from "../StateProvider";
import io from "socket.io-client";

function Chat() {
  const [emojiPicker, setEmojiPicker] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [message, setMessage] = useState("");
  const filePicker = useRef(null);

  //current room
  //eslint-disable-next-line
  const [{ user, currentRoom, token }, dispatch] = useStateValue();

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

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(message);
    ///room/message/:roomId
    const data = {
      message: {
        user_email: user.email,
        user_name: user.name,
        text: message,
        created_at: new Date().toDateString(),
      },
    };

    const headers = new Headers();
    headers.append("authorization", `Bearer ${token}`);
    headers.append("Content-Type", "application/json");

    fetch(`http://localhost:4000/api/room/message/${currentRoom._id}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: headers,
    });

    setMessage("");
  };

  const renderMessages = () => {
    let messages = currentRoom?.messages || [];
    messages = Array.from(new Set(messages));

    return messages.map((msg, i) => {
      if (msg !== undefined && msg.user_email === user.email) {
        return (
          <ChatMessage
            name={msg.user_name}
            text={msg.text}
            created_at={msg.created_at}
            isReceiver={true}
            key={i}
          />
        );
      } else if (msg !== undefined) {
        return (
          <ChatMessage
            name={msg.user_name}
            text={msg.text}
            created_at={msg.created_at}
            key={i}
          />
        );
      } else {
        return <div key={i}></div>;
      }
    });
  };

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("newMessage", ({ id }) => {
      console.log(id);
      const headers = new Headers();
      ///room/message/:roomId/latest

      console.log(token);
      headers.append("authorization", `Bearer ${token}`);
      fetch(`http://localhost:4000/api/room/message/latest?roomId=${id}`, {
        headers: headers,
      })
        .then((res) => {
          return res.json();
        })
        .then(({ latest_message }) => {
          dispatch({
            type: "GOT_MESSAGE",
            message: latest_message,
            id: id,
          });
        });
    });

    return () => socket.disconnect();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={"http://localhost:4000/" + currentRoom?.room_image} />
        <div className="chat__headerInfo">
          <h4>{currentRoom?.room_name}</h4>
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
      <div className="chat__body">{renderMessages()}</div>

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

        <form onSubmit={sendMessage}>
          <input value={message} onChange={handleChangeInput} type="text" />
          <IconButton type="submit">
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
