import React from "react";
import "./PacketInfo.css";
import { useTranslation } from "react-i18next";
import moment from "moment";

const PacketInfo = ({ packetData }) => {
  const { t } = useTranslation();
  //   {
  //     "companyId": 56,
  //     "isActive": true,
  //     "companyName": "FPT Software",
  //     "totalJob": 4,
  //     "totalApplied": 0,
  //     "totalVisited": 0,
  //     "packetId": 0,
  //     "createdDate": null,
  //     "packetName": "Basic",
  //     "packetPrice": 0,
  //     "totalDayEffect": -1,
  //     "totalJobEffect": 1,
  //     "endDate": null
  // }
  //   {
  //     "httpCode": 200,
  //     "timestamp": "2023-06-14T20:16:35.274+07:00",
  //     "objectData": [
  //         {
  //             "packetId": 1,
  //             "packetName": "Silver",
  //             "packetPrice": 1.0,
  //             "level": 1,
  //             "totalJob": 2,
  //             "totalDayEffect": 30
  //         },
  //         {
  //             "packetId": 2,
  //             "packetName": "Gold",
  //             "packetPrice": 5.0,
  //             "level": 2,
  //             "totalJob": 5,
  //             "totalDayEffect": 30
  //         },
  //         {
  //             "packetId": 3,
  //             "packetName": "Premium",
  //             "packetPrice": 7.99,
  //             "level": 3,
  //             "totalJob": 10,
  //             "totalDayEffect": 30
  //         }
  //     ]
  // }
  return (
    <div className={`PacketInfo__container PacketInfo__${packetData.packetName}`}>
      <div className="PacketInfo__companyName">
        {t("business.packet.info.companyName")}: <b>{packetData.companyName}</b>
      </div>
      <div className="PacketInfo__packetName">
        {t("business.packet.info.packetName")}: <b>{packetData.packetName}</b>
      </div>
      <div>
        {t("business.packet.info.price")}:{" "}
        <b>
          {packetData.packetPrice <= 0
            ? t("business.packet.info.free")
            : packetData.packetPrice}
        </b>{" "}
        $/{t("business.packet.info.month")}
      </div>
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
  );
};

export default PacketInfo;
