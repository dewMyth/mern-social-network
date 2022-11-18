import React from "react";
import "./ChatOnline.css";

const ChatOnline = () => {
  return (
    <>
      <div className="chatOnline">
        <div className="chatOnlineFriend">
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src="https://www.pngmart.com/files/10/User-Account-Person-PNG-File.png"
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <div className="chatOnlineName">John Doe</div>
        </div>
      </div>
    </>
  );
};

export default ChatOnline;
