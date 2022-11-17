import React, { useState, useEffect, useContext } from "react";
import Share from "../Share/Share";
import Post from "../Post/Post";
import "./Feed.css";

import axios from "axios";

import { AuthContext } from "../../../context/AuthContext";

const Feed = ({ username }) => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/" + user._id);
      setPosts(
        res.data.sort((post1, post2) => {
          return new Date(post2.createdAt) - new Date(post1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user._id]);

  return (
    <>
      <div className="feedContainer">
        <div className="feedWrapper">
          <Share />
          {posts.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
