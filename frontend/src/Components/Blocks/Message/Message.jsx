import React, { useState, useEffect } from "react";
import "./Message.css";
import { format } from "timeago.js";

import axios from "axios";
import baseUrl from "../../../baseURL";

const Message = ({ message, own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [sender, setSender] = useState({});

  useEffect(() => {
    const getSender = async () => {
      try {
        const res = await axios.get(
          baseUrl + "user?userId=" + message.senderId
        );
        setSender(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getSender();
  }, [message]);

  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src={
              sender?.profilePicture
                ? PF + sender.profilePicture
                : PF + "avatar.svg"
            }
            alt=""
          />
          <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
      </div>
    </>
  );
};

export default Message;
