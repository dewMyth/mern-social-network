import React, { useContext, useRef, useState } from "react";
import "./Share.css";

import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import { AuthContext } from "../../../context/AuthContext";

import baseUrl from "../../../baseURL";

import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Share = () => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const descRef = useRef();

  const [postImg, setpostImg] = useState(null);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      handleOpen();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {open ? (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Success
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Alert severity="success">
                Post Created Successfully! Refresh the page to see the post.
              </Alert>
            </Typography>
          </Box>
        </Modal>
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
              placeholder={"What is in your mind,  " + user.username + "?"}
              type="text"
              ref={descRef}
            />
          </div>
          <hr className="shareHr" />
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
