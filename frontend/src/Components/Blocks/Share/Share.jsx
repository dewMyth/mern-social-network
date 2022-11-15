import React from "react";
import "./Share.css";

import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

const Share = () => {
  return (
    <>
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src="/assets/person/1.jpg"
              alt=""
            />
            <input
              className="shareInput"
              placeholder="What is in your mind?"
              type="text"
            />
          </div>
          <hr className="shareHr" />
          <div className="shareBottom">
            <div className="shareOptions">
              <div className="shareOption">
                <PermMedia className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
              </div>
              <div className="shareOption">
                <Label className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton">Share</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
