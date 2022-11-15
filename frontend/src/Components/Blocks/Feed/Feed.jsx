import React, { useState, useEffect } from "react";
import Share from "../Share/Share";
import Post from "../Post/Post";
import "./Feed.css";

import axios from "axios";

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/post/profile/" + username)
        : await axios.get("/post/timeline/6117b7f2dfe6082f38642223");
      setPosts(res.data);
    };
    fetchPosts();
  }, [username]);

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
