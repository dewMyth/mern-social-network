import React, { useState } from "react";

import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";

import baseUrl from "../../../baseURL";

import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@material-ui/icons";

import axios from "axios";

const EditPost = ({
  post,
  user,
  openEditModal,
  setOpenEditModal,
  postImg,
  setPostImg,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 500,
    bgcolor: "background.paper",
    textAlign: "center",
    outline: "none",
  };

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();
    const newEditedPost = {
      userId: user._id,
      desc: desc,
    };
    if (newImg) {
      const data = new FormData();
      data.append("postImg", newImg);
      try {
        await axios.post(baseUrl + "upload", data).then((res) => {
          newEditedPost.img = res.data.imgPath;
        });
      } catch (err) {
        console.log(err);
      }
    }
    console.log(newEditedPost);
    try {
      await axios.put(baseUrl + "post/update/" + post._id, newEditedPost);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [desc, setDesc] = useState(post.desc);
  const [img, setImg] = useState(postImg);
  const [newImg, setNewImg] = useState(null);

  return (
    <>
      <Modal
        open={openEditModal}
        onClose={() => setOpenEditModal(!openEditModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={3} style={style}>
          {/* Share Component */}

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
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>
              <hr className="shareHr" />
              {img || newImg ? (
                <div className="shareImgContainer">
                  <img
                    className="shareImg"
                    src={img ? img : URL.createObjectURL(newImg)}
                    style={{ width: "50%", height: "50%" }}
                    alt=""
                  />
                  <Cancel
                    className="shareCancelImg"
                    onClick={() => setImg(null) || setNewImg(null)}
                  />
                </div>
              ) : (
                ""
              )}
              <form className="shareBottom" onSubmit={handleEditPostSubmit}>
                <div className="shareOptions">
                  <label htmlFor="editPostImg" className="shareOption">
                    <PermMedia className="shareIcon" />
                    <span className="shareOptionText">Photo or Video</span>
                    <input
                      style={{ display: "none" }}
                      type="file"
                      id="editPostImg"
                      accept=".png, .jpeg, .jpg"
                      onChange={(e) => setNewImg(e.target.files[0])}
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
        </Paper>
      </Modal>
    </>
  );
};

export default EditPost;
