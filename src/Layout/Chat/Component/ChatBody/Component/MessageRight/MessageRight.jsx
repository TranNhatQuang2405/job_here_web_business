import React from "react";
import { Avatar } from "Components/Image";
import "./MessageRight.css";

const MessageRight = ({ content, avatar }) => {
  return (
    <div className="MessageRight__box">
      <Avatar url={avatar} width="40px" />
      <div className="MessageRight__text">{content}</div>
    </div>
  );
};

export default MessageRight;
