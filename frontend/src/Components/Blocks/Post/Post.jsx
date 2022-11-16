import React, { useState, useEffect, useContext } from "react";
import "./Post.css";

import { Link } from "react-router-dom";

import { MoreVert } from "@material-ui/icons";

import axios from "axios";

import { format } from "timeago.js";

import baseUrl from "../../../baseURL";

import { AuthContext } from "../../../context/AuthContext";

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);

  const public_folder = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [poster, setPoster] = useState({});
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchPoster = async () => {
      const res = await axios.get("/user/view/" + post.userId);
      setPoster(res.data);
    };
    fetchPoster();
  }, [post.userId]);

  const onLikeClick = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    try {
      axios
        .put(baseUrl + "post/" + post._id + "/like", { userId: user._id })
        .then((res) => {
          console.log(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="post">
        <div className="postWrapper">
          <div className="postTop">
            <div className="postTopLeft">
              <Link to={`/profile/${poster.username}`}>
                <img
                  className="postProfileImg"
                  src={poster.profilePicture || public_folder + "avatar.svg"}
                  width="100px"
                  alt=""
                />
              </Link>
              <span className="postUsername">{poster.username}</span>
              <span className="postDate">{format(post.createdAt)}</span>
            </div>
            <div className="postTopRight">
              <MoreVert />
            </div>
          </div>
          <div className="postCenter">
            <span className="postText">{post.desc}</span>
            <img className="postImg" src={post.img} alt="" />
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
