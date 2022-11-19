import React, { useState } from "react";
import { useEffect } from "react";
import "./ChatOnline.css";

import baseUrl from "../../../baseURL";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentUserId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(
          baseUrl + "user/followings/" + currentUserId
        );
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [currentUserId]);

  useEffect(() => {
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [friends]);

  const handleClickOnlineFriend = async (onlineFriend) => {
    try {
      const res = await axios.get(
        baseUrl +
          "conversation/get-conversation/" +
          currentUserId +
          "/" +
          onlineFriend._id
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chatOnline">
        {onlineFriends.map((onlineFriend) => (
          <div
            className="chatOnlineFriend"
            onClick={() => handleClickOnlineFriend(onlineFriend)}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  onlineFriend.profilePicture
                    ? PF + onlineFriend.profilePicture
                    : PF + "avatar.svg"
                }
                alt=""
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <div className="chatOnlineName">{onlineFriend.username}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatOnline;
