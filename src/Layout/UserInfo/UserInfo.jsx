import React, { useState, useEffect, memo } from "react";
import "./UserInfo.css";
import { PathTree } from "Components/Path";
import { Avatar } from "Components/Image";
import { Row, Col } from "react-bootstrap/";
import Moment from "moment";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Icon } from "Components/Image";
import level from "Assets/Icons/level.png";
import gender from "Assets/Icons/gender.png";
import map from "Assets/Icons/map.png";
import suitcase from "Assets/Icons/suitcase.png";

let userInfo = {
  fullname: "Tran Nhat Quang",
  email: "trannhatquang2405@gmail.com",
  phone: "032553576",
  gender: "MALE",
  dateOfBirth: "03/03/2002",
  address: "Terstt jkfdsglfg kfdjghsilf jfhgh",
};

const UserInfo = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  // const [userInfo, setUserInfo] = useState({});
  const formatDate = (date) => {
    let result = Moment(date).format("DD/MM/yyyy");
    return result;
  };

  return (
    <div>
      <PathTree
        lastPath={userInfo.fullname || t("business.user.info.about")}
        activeStart={false}
      />
      <div className="userInfo__header">
        <Avatar width="120px" url={userInfo.avatar} />
        <div className="userInfo__header-content">
          <div className="userInfo__header-content-fullname">{userInfo.fullname}</div>
          <div className="userInfo__header-content-email">
            <i className="bi bi-envelope-fill" /> {userInfo.email}
          </div>
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
                    {userInfo.dateOfBirth}
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
                  <div className="userInfo__common-item-content">{userInfo.gender}</div>
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
                  <div className="userInfo__common-item-content">{userInfo.phone}</div>
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
  );
};

export default memo(UserInfo);
