import React from "react";
import "./PacketInfo.css";
import { useTranslation } from "react-i18next";
import moment from "moment";
import { useSelector } from "react-redux";

const PacketInfo = ({ packetData }) => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);

  if (!userInfo.companyId) return null;

  return (
    <div className={`PacketInfo__container PacketInfo__${packetData.packetName}`}>
      <div className="PacketInfo__companyName">
        {t("business.packet.info.companyName")}: <b>{packetData.companyName}</b>
      </div>
      <div className="d-flex flex-wrap">
        <div className="flex-grow-1">
          <div className="PacketInfo__packetName">
            {t("business.packet.info.packetName")}: <b>{packetData.packetName}</b>
          </div>
          <div>
            {t("business.packet.info.price")}:{" "}
            <b>
              {packetData.packetPrice <= 0
                ? t("business.packet.info.free")
                : packetData.packetPrice + ` $/${t("business.packet.info.month")}`}
            </b>
          </div>
        </div>
        <div className="flex-grow-1">
          <div>
            {t("business.packet.info.dayEffect")}:{" "}
            <b>
              {packetData.totalDayEffect < 0
                ? t("business.packet.info.unlimited")
                : packetData.totalDayEffect + " " + t("business.packet.info.day")}
            </b>
          </div>
          {packetData.totalDayEffect > 0 && (
            <div>
              {t("business.packet.info.endDate")}:{" "}
              <b>{moment(packetData.endDate).format("DD-MM-YYYY")}</b>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PacketInfo;
