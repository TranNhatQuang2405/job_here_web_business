import React, { memo } from "react";
import { PathTree } from "Components/Path";
import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import "./ManageJob.css";
import { useTranslation } from "react-i18next";
import { ListJob } from "./Component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ManageJob = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const { t } = useTranslation();

  const handleAddJob = () => {
    navigate("/manageJob/addJob");
  };

  return (
    <div>
      <div className="manageJob__header-layout">
        <PathTree className="d-none d-lg-block" />
        {!!userInfo.companyId && (
          <div className="manageJob__buttonAdd-layout">
            <Button onClick={handleAddJob}>
              <PlusCircleFill size="25" color="aliceblue" />
              <span className="manageJob__buttonAdd-content">
                {t("business.manage.job.add")}
              </span>
            </Button>
          </div>
        )}
      </div>
      <ListJob companyId={userInfo.companyId} />
    </div>
  );
};

export default memo(ManageJob);
