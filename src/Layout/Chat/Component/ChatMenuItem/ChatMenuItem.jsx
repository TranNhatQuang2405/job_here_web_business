import React from "react";
import "./ChatMenuItem.css";
import { Avatar } from "Components/Image";
import { convertToTimeString } from "Config/Support/TimeSupport";
import { useTranslation } from "react-i18next";

const ChatMenuItem = ({ messageData, onClick, currentMessage }) => {
  const { t } = useTranslation();
  const className =
    currentMessage === messageData.messageId
      ? "ChatMenuItem__box active"
      : "ChatMenuItem__box";

  return (
    <div className={className} onClick={onClick}>
      <div className="ChatMenuItem__time">
        {convertToTimeString(messageData.createdDate, t)}
      </div>
      <Avatar
        url={messageData.userImageUrl}
        className="ChatMenuItem__img"
        width="60px"
      />
      <div className="ChatMenuItem__mainContent">
        <div className="ChatMenuItem__name">{messageData.fullName}</div>
        <div className="ChatMenuItem__content">{messageData.content}</div>
      </div>
      {messageData.fromUser && !messageData.hasRead && (
        <div className="ChatMenuItem__hasNew"></div>
      )}
    </div>
  );
};

export default ChatMenuItem;
