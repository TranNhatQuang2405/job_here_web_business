import React from "react";
import { Avatar } from "Components/Image";
import "./MessageLeft.css";

const MessageLeft = ({ avatar, content }) => {
  return (
    <div className="MessageLeft__box">
      <Avatar url={avatar} width="40px" />
      <div className="MessageLeft__text">{content}</div>
    </div>
  );
};

export default MessageLeft;
