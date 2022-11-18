import React, { useEffect, useState, useContext } from "react";
import "./Messenger.css";
import NavBar from "../../Blocks/NavBar/NavBar";
import Conversation from "../../Blocks/Conversation/Conversation";
import Message from "../../Blocks/Message/Message";
import ChatOnline from "../../Blocks/ChatOnline/ChatOnline";
import { AuthContext } from "../../../context/AuthContext";
import baseUrl from "../../../baseURL";

import axios from "axios";

const Messenger = () => {
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState(null);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          baseUrl + "conversation/get-conversations/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);

  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((conversation) => {
              return (
                <Conversation
                  key={conversation._id}
                  conversation={conversation}
                  currentUser={user}
                />
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            <div className="chatBoxTop">
              <Message own={true} />
              <Message own={false} />
              <Message own={false} />
              <Message own={false} />
              <Message own={false} />
              <Message own={true} />
              <Message own={true} />
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Write something..."
              ></textarea>
              <button className="chatSubmitButton">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
