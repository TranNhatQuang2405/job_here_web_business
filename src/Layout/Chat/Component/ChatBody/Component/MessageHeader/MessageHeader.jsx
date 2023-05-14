import React from "react";
import "./MessageHeader.css";
import { Avatar } from "Components/Image";
import { TrashFill } from "react-bootstrap-icons";
import { messageBusiness } from "Business";
import { useTranslation } from "react-i18next";
import { confirm } from "Config/Redux/Slice/AlertSlice";
import { useDispatch } from "react-redux";

const MessageHeader = ({ messageData, setCurrentMessage }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const confirmDelete = () => {
    dispatch(
      confirm({
        message: t("chat.delete.confirm"),
        title: t("chat.delete.title"),
        onConfirm: () => handleDelete(),
      })
    );
  };
  const handleDelete = async () => {
    let result = await messageBusiness.deleteMessage(messageData.messageId);
    if (result.data.httpCode === 200) {
      setCurrentMessage(null);
    }
  };

  return (
    <div className="MessageHeader__box">
      <div>
        <Avatar width="60px" url={messageData.userImageUrl} />
      </div>
      <div className="MessageHeader__name">
        <div>{messageData.fullName}</div>
      </div>
      <div className="MessageHeader__trash" onClick={confirmDelete}>
        <TrashFill />
      </div>
    </div>
  );
};

export default MessageHeader;
