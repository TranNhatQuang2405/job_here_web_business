import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { packetBusiness, reportBusiness } from "Business";
import _ from "underscore";
import "./AllPacket.css";

const AllPacket = () => {
  const { t } = useTranslation();
  const [packetData, setPacketData] = useState([]);
  const [loading, setLoading] = useState(true);
  let currentPrice = useRef(0);

  useEffect(() => {
    const getData = async () => {
      let res = await packetBusiness.getAllPacket();
      if (res.data.httpCode === 200) {
        setPacketData(res.data?.objectData ?? []);
      }
      let res2 = await reportBusiness.getDashboard();
      if (res2.data.httpCode === 200) {
        currentPrice.current = res2.data.objectData.packetPrice;
      }
      setLoading(false);
    };
    getData();
  }, []);

  const onBuyPacket = (packetId, packetPrice) => async () => {
    if (packetPrice >= currentPrice.current) {
      setLoading(true);
      let res = await packetBusiness.buyPacket(packetId);
      if (res.data.httpCode === 200) {
        window.location.replace(res.data.message);
      } else setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="AllPacket__container">
      <div className="AllPacket__title">{t("business.packet.allPacket")}</div>
      <Row className="justify-content-center">
        {_.map(packetData, (packet, index) => {
          return (
            <Col
              key={packet.packetId}
              className={`AllPacket__item ${
                packet.packetPrice === currentPrice.current
                  ? "AllPacket__item-current"
                  : ""
              } AllPacket__item-${packet.packetName} text-center cur-pointer`}
              onClick={onBuyPacket(packet.packetId, packet.packetPrice)}
            >
              <div
                className={`AllPacket__item-img-wrapper ${
                  index % 2 === 0 ? "" : `AllPacket__${packet.packetName}`
                }`}
              >
                <Image
                  src={require(`Assets/Images/${packet.packetName}.svg`)}
                  className="AllPacket__item-img"
                />
              </div>
              <div
                className={`${index % 2 !== 0 ? "" : `AllPacket__${packet.packetName}`} pt-1 pb-3`}
              >
                <div className="AllPacket__item-packetName mt-2">{packet.packetName}</div>
                <div>
                  <b>{packet.packetPrice}</b> $/{t("business.packet.info.month")}
                </div>
                <div>
                  <b>{packet.totalJob}</b> {t("business.packet.info.totalJob")}
                </div>
                <div>
                  <b>{packet.totalDayEffect}</b> {t("business.packet.info.dayEffect")}
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AllPacket;
