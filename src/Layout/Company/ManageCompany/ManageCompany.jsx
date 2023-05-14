import React, { memo, useState, useEffect } from "react";
import { AddCompany } from "./Component";
import { useTranslation } from "react-i18next";
import { PathTree } from "Components/Path";
import { PlusCircleFill } from "react-bootstrap-icons";
import "./ManageCompany.css";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ManageCompany = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo?.companyId) {
      navigate(`/manageCompany/companyInfo/${userInfo.companyId}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  return (
    <div>
      <AddCompany show={showModal} onHide={() => setShowModal(false)} />
      <div className="manageCompany__header-layout">
        <PathTree className="d-none d-lg-block" />
        <div className="manageCompany__buttonAdd-layout">
          <Button onClick={() => setShowModal(true)}>
            <PlusCircleFill size="25" color="aliceblue" />
            <span className="manageCompany__buttonAdd-content">
              {t("business.manage.company.add")}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(ManageCompany);
