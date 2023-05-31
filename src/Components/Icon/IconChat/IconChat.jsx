import React, { useEffect, useState } from "react";
import { ChatDotsFill } from "react-bootstrap-icons";
import { messageBusiness } from "Business";
import SockJsClient from "react-stomp";
import { SOCKET_URL } from "Config/Api/Host";
import { TOPIC_MESSAGES_COMPANY } from "Config/Support/PathSupport";
import { useSelector } from "react-redux";
import "./IconChat.css";

const IconChat = () => {
  const sessionInfo = useSelector((state) => state.User.sessionInfo);
  const topicMessages = `${TOPIC_MESSAGES_COMPANY}/${sessionInfo.companyId}`;
  const [hasChange, setHasChange] = useState(false);
  const [count, setCount] = useState(0);

  const onMessageReceived = (msg) => {
    setHasChange((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (sessionInfo.companyId) {
        let result = await messageBusiness.countUnreadMessage(sessionInfo.companyId);
        if (result.data.httpCode === 200) {
          if (result.data.objectData * 1 > 9) setCount("9+");
          else setCount(result.data.objectData);
        }
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasChange]);

  return (
    <div className="IconChat__box">
      {sessionInfo.companyId && (
        <SockJsClient
          url={SOCKET_URL}
          topics={[topicMessages]}
          onMessage={(msg) => onMessageReceived(msg)}
          debug={false}
        />
      )}
      <ChatDotsFill />
      {count > 0 || count === "9+" ? <div className="IconChat__num">{count}</div> : <></>}
    </div>
  );
};

export default IconChat;
