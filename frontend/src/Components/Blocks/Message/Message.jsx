import React from "react";
import "./Message.css";

const Message = ({ own }) => {
  return (
    <>
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          <img
            className="messageImg"
            src="https://www.pngmart.com/files/10/User-Account-Person-PNG-File.png"
            alt=""
          />
          <p className="messageText">
            Hello! Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsam architecto nulla obcaecati culpa consequatur natus quos in
            excepturi. Facilis harum odit enim ullam molestias neque labore
            cupiditate doloremque dolore quia!
          </p>
        </div>
        <div className="messageBottom">1 min ago</div>
      </div>
    </>
  );
};

export default Message;
