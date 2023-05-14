import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { reportBusiness } from "Business";
import "./HomePage.css";

const HomePage = () => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const [dashboardData, setDashboardData] = useState({});

  useEffect(() => {
    const getData = async () => {
      let res = await reportBusiness.getDashboard();
      if (res.data.httpCode === 200) {
        setDashboardData(res.data.objectData);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Row className="HomePage-Dashboard">
        <Col xs={12} md={6} lg={3} className="HomePage-Dashboard__item">
          <NavLink
            to={
              userInfo?.companyId
                ? `/manageCompany/companyInfo/${userInfo.companyId}`
                : "/manageCompany"
            }
          >
            <div className="HomePage-Dashboard__item-wrap Item_1">
              <i className="bi bi-building" />
              <div>
                <p className="HomePage-Dashboard__company">
                  {dashboardData?.companyName ?? t("manageCompany")}
                </p>
                {dashboardData?.companyName && (
                  <p className="HomePage-Dashboard__text">
                    {dashboardData.isActive
                      ? t("dashboard.active")
                      : t("dashboard.noactive")}
                  </p>
                )}
              </div>
            </div>
          </NavLink>
        </Col>
        <Col xs={12} md={6} lg={3} className="HomePage-Dashboard__item">
          <NavLink to="/manageJob">
            <div className="HomePage-Dashboard__item-wrap Item_2">
              <i className="bi bi-briefcase" />
              <div>
                <p className="HomePage-Dashboard__number">
                  {dashboardData?.totalJob ?? 0}
                </p>
                <p className="HomePage-Dashboard__text">{t("dashboard.totalJobs")}</p>
              </div>
            </div>
          </NavLink>
        </Col>
        <Col xs={12} md={6} lg={3} className="HomePage-Dashboard__item">
          <div className="HomePage-Dashboard__item-wrap Item_3">
            <i className="bi bi-calendar-check" />
            <div>
              <p className="HomePage-Dashboard__number">
                {dashboardData?.totalApplied ?? 0}
              </p>
              <p className="HomePage-Dashboard__text">
                {t("dashboard.totalAppliedToday")}
              </p>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} lg={3} className="HomePage-Dashboard__item">
          <div className="HomePage-Dashboard__item-wrap Item_4">
            <i className="bi bi-calendar-check" />
            <div>
              <p className="HomePage-Dashboard__number">
                {dashboardData?.totalApplied ?? 0}
              </p>
              <p className="HomePage-Dashboard__text">
                {t("dashboard.totalAppliedToday")}
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
