import React, { useState, useEffect, useContext, useRef } from "react";
import "./Post.css";

import { Link } from "react-router-dom";

import { MoreVert } from "@material-ui/icons";

import axios from "axios";

import { format } from "timeago.js";

import baseUrl from "../../../baseURL";

import { AuthContext } from "../../../context/AuthContext";

import { storage } from "../../../firebase.config";
import { ref, getDownloadURL } from "firebase/storage";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditPost from "./EditPost";

import { io } from "socket.io-client";

const Post = ({ post }) => {
  const [imgPathfromFS, setImgPathfromFS] = useState("");

  const { user } = useContext(AuthContext);

  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [poster, setPoster] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  const [openEditModal, setOpenEditModal] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMorevert = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const fetchPoster = async () => {
      const res = await axios.get("/user/view/" + post.userId);
      setPoster(res.data);
    };
    fetchPoster();
  }, [post.userId]);

  useEffect(() => {
    //BUG FIX
    const imagePath = post.img?.replace(/"([^"]+(?="))"/g, "$1");
    //END BUG FIX
    if (imagePath) {
      getDownloadURL(ref(storage, imagePath)).then((url) => {
        setImgPathfromFS(url);
      });
    } else {
      setImgPathfromFS("");
    }
  }, [post.img]);

  const socket = useRef();

  useEffect(() => {
    // Run this just once -> empty dependency array []
    socket.current = io("ws://localhost:5002");
  }, []);

  const onLikeClick = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    try {
      axios
        .put(baseUrl + "post/" + post._id + "/like", { userId: user._id })
        .then((res) => {
          sendNotificationToPoster();
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Emit socket id and user id to notification socket server
    socket.current.emit("addUser", user._id);
  }, []);

  const sendNotificationToPoster = async () => {
    // Send the message to socket server
    socket.current.emit("sendNotification", {
      senderId: user._id,
      receiverId: post.userId,
      typeOfNotification: "like",
      post: post._id,
    });

    try {
      await axios.post(baseUrl + "notification/create", {
        senderId: user._id,
        receiverId: post.userId,
        typeOfNotification: "like",
        post: post._id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const ownPost = user._id === post.userId;

  return (
    <>
      {openEditModal ? (
        <EditPost
          openEditModal
          setOpenEditModal={setOpenEditModal}
          setPostImg={setImgPathfromFS}
          post={post}
          user={user}
          postImg={imgPathfromFS}
        />
      ) : null}
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <ListItem>
                <ListItemAvatar>
                  <img
                    className="postProfileImg"
                    src={
                      user.profilePicture
                        ? public_folder + user.profilePicture
                        : public_folder + "avatar.svg"
                    }
                    width="100px"
                    alt=""
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={poster.firstName + " " + poster.lastName}
                  secondary={`@${poster.username}`}
                />
                <span className="postDate">{format(post.createdAt)}</span>
              </ListItem>
            </div>
            <div className="postTopRight">
              {ownPost && (
                <MoreVert
                  id="basic-button"
                  aria-controls={openMorevert ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={openMorevert ? "true" : undefined}
                  onClick={handleClick}
                />
              )}

              {
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={openMorevert}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      setOpenEditModal(true);
                    }}
                  >
                    Edit Post
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Delete Post</MenuItem>
                </Menu>
              }
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>

            <img className="postImg" src={imgPathfromFS} alt="" />
          </div>
          <div className="postBottom">
            <div className="postBottomLeft">
              <img
                className="likeIcon"
                src={public_folder + "like.svg"}
                alt=""
                onClick={onLikeClick}
              />
              <img
                className="likeIcon"
                src={public_folder + "heart.svg"}
                alt=""
                onClick={onLikeClick}
              />
              <span className="postLikeCounter">{like} people like this</span>
            </div>
            <div className="postBottomRight">
              <span className="postCommentText">9 comments</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
