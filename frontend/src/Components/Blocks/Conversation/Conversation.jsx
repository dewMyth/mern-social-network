import React from "react";
import "./Conversation.css";

const Conversation = () => {
  return (
    <>
      <div className="conversation">
        <img
          className="conversationImg"
          src="https://www.pngmart.com/files/10/User-Account-Person-PNG-File.png"
          alt=""
        />
        <span className="conversationName">John Doe</span>
      </div>
    </>
  );
};

export default Conversation;
