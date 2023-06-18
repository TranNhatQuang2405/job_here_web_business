import React, { useState, useEffect } from "react";
import { Col, Row, Image } from "react-bootstrap";
import { LoadingSpinner } from "Components/Loading";
import { useTranslation } from "react-i18next";
import { packetBusiness } from "Business";
import _ from "underscore";
import "./AllPacket.css";

const AllPacket = () => {
  const { t } = useTranslation();
  const [packetData, setPacketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let res = await packetBusiness.getAllPacket();
      if (res.data.httpCode === 200) {
        setPacketData(res.data?.objectData ?? []);
      }
      setLoading(false);
    };
    getData();
  }, []);

  const onBuyPacket = (packetId) => async () => {
    setLoading(true);
    let res = await packetBusiness.buyPacket(packetId);
    if (res.data.httpCode === 200) {
      window.location.replace(res.data.message);
    } else setLoading(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="AllPacket__container">
      <div className="AllPacket__title">{t("business.packet.allPacket")}</div>
      <Row className="justify-content-center">
        {_.map(packetData, (packet) => {
          return (
            <Col
              key={packet.packetId}
              className={`AllPacket__item AllPacket__${packet.packetName} text-center cur-pointer`}
              onClick={onBuyPacket(packet.packetId)}
            >
              <div className="AllPacket__item-img-wrapper">
                <Image
                  src={require(`Assets/Images/${packet.packetName}.svg`)}
                  className="AllPacket__item-img"
                />
              </div>
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
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default AllPacket;
