import React from "react";
import "./Messenger.css";
import NavBar from "../../Blocks/NavBar/NavBar";
import Conversation from "../../Blocks/Conversation/Conversation";
import Message from "../../Blocks/Message/Message";
import ChatOnline from "../../Blocks/ChatOnline/ChatOnline";

const Messenger = () => {
  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            <Conversation />
            <Conversation />
            <Conversation />
            <Conversation />
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
