import React, { useEffect, useState, useContext } from "react";
import "./Messenger.css";
import NavBar from "../../Blocks/NavBar/NavBar";
import Conversation from "../../Blocks/Conversation/Conversation";
import Message from "../../Blocks/Message/Message";
import ChatOnline from "../../Blocks/ChatOnline/ChatOnline";
import { AuthContext } from "../../../context/AuthContext";
import baseUrl from "../../../baseURL";

import axios from "axios";

const Messenger = () => {
  const { user } = useContext(AuthContext);

  const [conversations, setConversations] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get(
          baseUrl + "conversation/get-conversations/" + user._id
        );
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          baseUrl + "message/get-messages/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmitMsg = async (e) => {
    e.preventDefault();

    const messsage = {
      senderId: user._id,
      conversationId: currentChat._id,
      text: newMessage,
    };

    console.log(messsage);

    try {
      const res = await axios.post(baseUrl + "message/create", messsage);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations?.map((conversation) => {
              return (
                <div
                  key={conversation._id}
                  onClick={() => setCurrentChat(conversation)}
                >
                  <Conversation
                    conversation={conversation}
                    currentUser={user}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => {
                    return (
                      <div key={message._id}>
                        <Message
                          message={message}
                          own={message.senderId === user._id ? true : false}
                        />
                      </div>
                    );
                  })}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmitMsg}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
