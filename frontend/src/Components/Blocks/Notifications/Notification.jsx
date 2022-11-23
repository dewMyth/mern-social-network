import React, { useState, useEffect } from "react";

import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";

import axios from "axios";
import baseUrl from "../../../baseURL";

const Notification = ({ notification }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [sender, setSender] = useState(null);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getSenderDetails = async () => {
      try {
        const res = await axios.get(
          baseUrl + "user?userId=" + notification.senderId
        );
        setSender(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getPostDetails = async () => {
      try {
        const res = await axios.get(baseUrl + "post/view/" + notification.post);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getSenderDetails();
    getPostDetails();
  }, []);

  return (
    <CardHeader
      avatar={
        <Avatar
          src={
            sender?.profilePicture
              ? PF + sender.profilePicture
              : PF + "avatar.svg"
          }
          aria-label="recipe"
        />
      }
      //   action={
      //     <IconButton aria-label="settings">
      //       <MoreVertIcon />
      //     </IconButton>
      //   }
      title={`You have a new ${notification.typeOfNotification} from ${sender?.firstName} ${sender?.lastName}`}
      subheader={post ? `For the post ${post?.desc}` : ""}
    />
  );
};

export default Notification;
