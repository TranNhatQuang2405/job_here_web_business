import React from "react";
import { MessageHeader, MessageInput, MessageLeft, MessageRight } from "./Component";
import "./ChatBody.css";
import { Spinner } from "react-bootstrap";

const ChatBody = ({ setCurrentMessage, currentMessage, childMessages, pending }) => {
  if (!currentMessage) return <></>;
  else
    return (
      <div className="ChatBody__box">
        <MessageHeader
          messageData={currentMessage}
          setCurrentMessage={setCurrentMessage}
        />
        <div className="ChatBody__listMessage fix_scroll">
          {pending ? (
            <div className="ChatBody__loading">
              <Spinner animation="border" variant="danger" />
            </div>
          ) : (
            childMessages &&
            childMessages.map((childMessage, index) => {
              if (!childMessage.fromUser)
                return (
                  <MessageRight
                    key={index}
                    content={childMessage.content}
                    avatar={currentMessage.companyImageUrl}
                  />
                );
              else
                return (
                  <MessageLeft
                    key={index}
                    content={childMessage.content}
                    avatar={currentMessage.userImageUrl}
                  />
                );
            })
          )}
        </div>
        <MessageInput messageData={currentMessage} />
      </div>
    );
};

export default ChatBody;
