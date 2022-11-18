import React, { useEffect } from "react";
import { useState } from "react";
import "./Conversation.css";
import baseUrl from "../../../baseURL";
import axios from "axios";

const Conversation = ({ conversation, currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friend, setFriend] = useState({});

  useEffect(() => {
    const friendId = conversation.members.find(
      (friend) => friend !== currentUser._id
    );
    const getFriend = async () => {
      try {
        const res = await axios.get(baseUrl + "user?userId=" + friendId);
        setFriend(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriend();
  }, [conversation, currentUser]);

  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src={
            friend.profilePicture ? friend.profilePicture : PF + "avatar.svg"
          }
          alt=""
        />
        <span className="conversationName">{friend.username}</span>
      </div>
    </>
  );
};

export default Conversation;
