import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./HomePage.css";

const HomePage = () => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.User.sessionInfo);

  return (
    <div>
      <div className="HomePage-Dashboard row">
        <NavLink
          to={
            userInfo.companyId
              ? `/manageCompany/companyInfo/${userInfo.companyId}`
              : "/manageCompany"
          }
          className="HomePage-Dashboard__item Item_1 col"
        >
          <i className="bi bi-building" />
          <div>
            <p className="HomePage-Dashboard__number">{56}</p>
            <p className="HomePage-Dashboard__text">{t("Your Company")}</p>
          </div>
        </NavLink>
        <NavLink to="/manageJob" className="HomePage-Dashboard__item Item_2 col">
          <i className="bi bi-briefcase" />
          <div>
            <p className="HomePage-Dashboard__number">{0}</p>
            <p className="HomePage-Dashboard__text">{t("Total Jobs")}</p>
          </div>
        </NavLink>
        <div className="HomePage-Dashboard__item Item_3 col">
          <i className="bi bi-calendar-check" />
          <div>
            <p className="HomePage-Dashboard__number">{16}</p>
            <p className="HomePage-Dashboard__text">{t("Total Applied")}</p>
          </div>
        </div>
        <div className="HomePage-Dashboard__item Item_4 col">
          <i className="bi bi-list-check" />
          <div>
            <p className="HomePage-Dashboard__number">{20}</p>
            <p className="HomePage-Dashboard__text">{t("Total Visit")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
