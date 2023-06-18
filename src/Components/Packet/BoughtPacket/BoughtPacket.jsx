import React, { useState, useEffect } from "react";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { packetBusiness } from "Business";
import _ from "underscore";
import "./BoughtPacket.css";
import { useSelector } from "react-redux";
import Moment from "moment";

const BoughtPacket = () => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const [listPacket, setListPacket] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, [userInfo.companyId]);

  const getData = async () => {
    if (userInfo.companyId) {
      let res = await packetBusiness.getBoughtPacket(userInfo.companyId);
      if (res.data.httpCode === 200) {
        setListPacket(res.data.objectData);
      }
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="BoughtPacket__container">
      <div className="BoughtPacket__title">{t("Bought Packet")}</div>
      {_.map(listPacket, (packet, index) => {
        return (
          <div key={index} className="BoughtPacket__item">
            <div className="d-flex justify-content-between">
              <div>
                {t("business.packet.info.packetName")}: <b>{packet.packetName}</b>
              </div>
              <div
                className={`BoughtPacket__item-status BoughtPacket__item-${packet.status}`}
              >
                {t(packet.status)}
              </div>
            </div>
            <div className="d-flex flex-wrap">
              <div className="flex-grow-1">
                <div>
                  {t("business.packet.info.price")}: <b>{packet.packetPrice}</b> $/
                  {t("business.packet.info.month")}
                </div>
                <div>
                  {t("business.packet.info.boughtDate")}:{" "}
                  {Moment(packet.boughtDate).format("DD-MM-YYYY")}
                </div>
              </div>
              <div className="flex-grow-1">
                <div>
                  {t("business.packet.info.totalJob")}: {packet.totalJob}
                </div>
                <div>
                  {t("business.packet.info.dayEffect")}: {packet.totalDayEffect}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BoughtPacket;
