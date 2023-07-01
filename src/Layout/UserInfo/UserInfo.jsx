import React, { useState, useEffect, useRef, memo } from "react";
import "./UserInfo.css";
import { PathTree } from "Components/Path";
import { Avatar } from "Components/Image";
import { Row, Col, Modal } from "react-bootstrap/";
import Moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "Components/Image";
import level from "Assets/Icons/level.png";
import gender from "Assets/Icons/gender.png";
import map from "Assets/Icons/map.png";
import suitcase from "Assets/Icons/suitcase.png";
import { userBusiness, messageBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";
import { Messenger } from "react-bootstrap-icons";
import { ButtonPrimary } from "Components/Button";
import { IconSpinner } from "Components/Icon";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const { t } = useTranslation();
  const sessionInfo = useSelector((state) => state.User.sessionInfo);
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [show, setShow] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [pendingSend, setPendingSend] = useState(false);
  const hadMessage = useRef(false);

  useEffect(() => {
    let isSubscribed = true;
    const first = async () => {
      let userId = getUserId();
      let result = await userBusiness.GetUserInfo(userId);
      if (result.data.httpCode === 200) {
        setUserInfo(result.data.objectData);
      }
      await checkMessage();
      setLoading(false);
    };
    if (isSubscribed) first();
    return () => {
      isSubscribed = false;
    };
  }, [location.pathname]);

  const checkMessage = async () => {
    const userId = getUserId();
    let res = await messageBusiness.getListMessageCompany(
      sessionInfo.companyId
    );
    if (res.data.httpCode === 200) {
      // Check if have message
      const _mess = res.data.objectData.find((mess) => mess.userId === userId);
      hadMessage.current = _mess?.messageId ?? false;
    }
  };

  const getUserId = () => {
    let stringPath = location.pathname;
    let tmpPath = stringPath.split("/");
    return tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
  };

  const formatDate = (date) => {
    let result = Moment(date).format("DD/MM/yyyy");
    return result;
  };

  const handleOpenChat = () => {
    if (hadMessage.current) {
      // Navigate to Message Screen
      navigate(`/message/${hadMessage.current}`);
    } else {
      // Open Chat Modal
      setShow(true);
    }
  };

  const handleChangeMessage = (e) => {
    setChatMessage(e.target.value);
  };

  const handleHide = () => {
    setChatMessage("");
    setShow(false);
  };

  const handleSend = async () => {
    if (chatMessage.trim() !== "") {
      setPendingSend(true);
      let params = {
        userId: getUserId(),
        companyId: sessionInfo.companyId,
        fromUser: false,
        content: chatMessage,
      };
      await messageBusiness.sendMessage(params);
      await checkMessage();
      if (hadMessage.current) {
        // Navigate to Message Screen
        navigate(`/message/${hadMessage.current}`);
      }
      setPendingSend(false);
      setShow(false);
      setChatMessage("");
    }
  };

  return (
    <div className="UserInfo__container">
      <PathTree
        lastPath={userInfo.fullname || t("business.user.info.about")}
        activeStart={false}
      />
      <Modal
        className="modal__custom-bg"
        size="md"
        fullscreen="lg-down"
        centered
        show={show}
        onHide={handleHide}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("companyPage.message.title")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            value={chatMessage}
            onChange={handleChangeMessage}
            size="large"
            placeholder={t("companyPage.message.placeholder")}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonPrimary onClick={handleHide} secondary={true}>
            {t("companyPage.message.close")}
          </ButtonPrimary>
          <ButtonPrimary onClick={handleSend}>
            {pendingSend ? (
              <IconSpinner variant="light" />
            ) : (
              t("companyPage.message.send")
            )}
          </ButtonPrimary>
        </Modal.Footer>
      </Modal>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="userInfo__header">
            <Avatar width="120px" url={userInfo.avatar} />
            <div className="userInfo__header-content">
              <div className="userInfo__header-content-fullname">
                {userInfo.fullname}
              </div>
              <div className="userInfo__header-content-email">
                <i className="bi bi-envelope-fill" /> {userInfo.email}
              </div>
              <ButtonPrimary secondary={true} onClick={handleOpenChat}>
                <Messenger className="userInfo__messageIcon" />
                {t("companyPage.sendMessage")}
              </ButtonPrimary>
            </div>
          </div>
          <div className="userInfo__body">
            <div className="userInfo__body-title mb-3">
              <span className="userInfo__body-title-line"></span>
              {t("business.user.info.about")}
            </div>
            <div className="userInfo__body-info-common">
              <Row>
                <Col lg={6} className="mb-3">
                  <div className="userInfo__common-item">
                    <div>
                      <Icon url={level} width="40px" />
                    </div>
                    <div className="d-flex-column">
                      <div className="userInfo__common-item-title">
                        {t("business.user.info.dateofbirth")}
                      </div>
                      <div className="userInfo__common-item-content">
                        {formatDate(userInfo.dateOfBirth)}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={6} className="mb-3">
                  <div className="userInfo__common-item">
                    <div>
                      <Icon url={gender} width="40px" />
                    </div>
                    <div className="d-flex-column">
                      <div className="userInfo__common-item-title">
                        {t("business.user.info.gender")}
                      </div>
                      <div className="userInfo__common-item-content">
                        {userInfo.gender}
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6} className="mb-3">
                  <div className="userInfo__common-item">
                    <div>
                      <Icon url={suitcase} width="40px" />
                    </div>
                    <div className="d-flex-column">
                      <div className="userInfo__common-item-title">
                        {t("business.user.info.phone")}
                      </div>
                      <div className="userInfo__common-item-content">
                        {userInfo.phone}
                      </div>
                    </div>
                  </div>
                </Col>
                {!!userInfo.address && (
                  <Col lg={6} className="mb-3">
                    <div className="userInfo__common-item">
                      <div>
                        <Icon url={map} width="40px" />
                      </div>
                      <div className="d-flex-column">
                        <div className="userInfo__common-item-title mb-1">
                          {t("business.user.info.address")}
                        </div>
                        <div className="userInfo__body-info-text-border">
                          {userInfo.address}
                        </div>
                      </div>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(UserInfo);
