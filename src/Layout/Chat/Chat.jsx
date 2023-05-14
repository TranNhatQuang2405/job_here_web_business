import React, { useState, useEffect, useRef } from "react";
import SockJsClient from "react-stomp";
import "./Chat.css";
import { Row, Col } from "react-bootstrap";
import { ChatBody, ChatMenuItem } from "./Component";
import { SOCKET_URL } from "Config/Api/Host";
import { messageBusiness } from "Business";
import { useSelector } from "react-redux";
import { TOPIC_MESSAGES_COMPANY } from "Config/Support/PathSupport";
import { useTranslation } from "react-i18next";

const Chat = () => {
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.User.sessionInfo);
  const [pending, setPending] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasChange, setHasChange] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(null);
  const [childMessages, setChildMessages] = useState([]);
  const topicMessages = `${TOPIC_MESSAGES_COMPANY}/${sessionInfo.companyId}`;
  const prevMessage = useRef(currentMessage);
  const currentSocket = useRef();

  let onMessageReceived = (msg) => {
    setHasChange((prev) => !prev);
    if (currentMessage && msg && msg.messageId === currentMessage.messageId)
      setHasNewMessage((prev) => !prev);
  };

  const handleChangeMessage = (e) => {
    setCurrentMessage(e);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currentMessage !== prevMessage.current) setPending(true);
      let result = await messageBusiness.getListChildMessage(currentMessage.messageId);
      await messageBusiness.viewAllMessageCompany(currentMessage.messageId);
      if (result?.data?.httpCode === 200) {
        setChildMessages(result?.data?.objectData || []);
      }
      if (currentMessage !== prevMessage) setPending(false);
      prevMessage.current = currentMessage;
    };
    if (currentMessage) fetchData(currentMessage);
  }, [currentMessage, hasNewMessage]);

  useEffect(() => {
    const fetchData = async () => {
      if (sessionInfo.companyId) {
        let result = await messageBusiness.getListMessageCompany(sessionInfo.companyId);
        if (result?.data?.httpCode === 200) {
          setMessages(result?.data?.objectData || []);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChange, sessionInfo.companyId]);

  // return null;

  return (
    <Row className="Chat__box ">
      {sessionInfo.companyId && (
        <SockJsClient
          url={SOCKET_URL}
          topics={[topicMessages]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
          ref={currentSocket}
        />
      )}
      <Col className="Chat__menu fix_scroll" xs={4}>
        {messages.length === 0 ? (
          <div className="Chat__noMessage">{t("chat.message.noMessage")}</div>
        ) : (
          <></>
        )}
        {messages.map((message, index) => (
          <ChatMenuItem
            currentMessage={currentMessage && currentMessage.messageId}
            key={index}
            messageData={message}
            onClick={() => handleChangeMessage(message)}
          />
        ))}
      </Col>
      <Col xs={8} className="p-0 Chat__content">
        {!pending && !currentMessage ? (
          <div className="Chat__noCurrentMessage">
            {t("chat.message.noCurrentMessage")}
          </div>
        ) : (
          <></>
        )}
        <ChatBody
          setCurrentMessage={setCurrentMessage}
          currentMessage={currentMessage}
          childMessages={childMessages}
          pending={pending}
        />
      </Col>
    </Row>
  );
};

export default Chat;
