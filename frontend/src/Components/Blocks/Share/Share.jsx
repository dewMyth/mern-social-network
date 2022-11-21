import React, { useContext, useRef, useState } from "react";
import "./Share.css";

import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";

import { Cancel } from "@material-ui/icons";

import { AuthContext } from "../../../context/AuthContext";

import baseUrl from "../../../baseURL";

import axios from "axios";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const descRef = useRef();

  const [postImg, setpostImg] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    console.log(descRef.current.value);
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
    };
    if (postImg) {
      const data = new FormData();
      data.append("postImg", postImg);
      try {
        await axios.post(baseUrl + "upload", data).then((res) => {
          newPost.img = res.data.imgPath;
        });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      console.log(newPost);
      await axios.post(baseUrl + "post/create", newPost);
      handleClick();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      {open ? (
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Post Created Successfully"
          action={action}
        />
      ) : null}
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              className="shareProfileImg"
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "avatar.svg"
              }
              alt=""
            />
            <input
              className="shareInput"
              placeholder={
                "What is in your mind,  " +
                user.firstName +
                " (@" +
                user.username +
                ") ?"
              }
              type="text"
              ref={descRef}
            />
          </div>
          <hr className="shareHr" />
          {postImg && (
            <div className="shareImgContainer">
              <img
                className="shareImg"
                src={URL.createObjectURL(postImg)}
                style={{ width: "50%", height: "50%" }}
                alt=""
              />
              <Cancel
                className="shareCancelImg"
                onClick={() => setpostImg(null)}
              />
            </div>
          )}
          <form className="shareBottom" onSubmit={handlePostSubmit}>
            <div className="shareOptions">
              <label htmlFor="postImg" className="shareOption">
                <PermMedia className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input
                  style={{ display: "none" }}
                  type="file"
                  id="postImg"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setpostImg(e.target.files[0])}
                />
              </label>
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
            <button className="shareButton" type="submit">
              Share
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Share;
