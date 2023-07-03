import React, { memo, useState, useEffect, useRef } from "react";
import { PathTree } from "Components/Path";
import { Button } from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import "./ManageJob.css";
import { useTranslation } from "react-i18next";
import { ListJob } from "./Component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jobBusiness, reportBusiness } from "Business";
import { LoadingSpinner } from "Components/Loading";

const ManageJob = () => {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.User.sessionInfo);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const stateData = useRef({
    jobLength: 0,
    totalJobEffect: 0,
  });

  useEffect(() => {
    const getData = async () => {
      let res = await reportBusiness.getDashboard();
      if (res.data.httpCode === 200) {
        stateData.current.totalJobEffect = res.data.objectData.totalJobEffect;
      }
      let result = await jobBusiness.GetListJobManageByCompanyId(userInfo.companyId);
      if (result.data.httpCode === 200) {
        stateData.current.jobLength = result.data.objectData.length;
      }
      setLoading(false);
    };
    getData();
  }, [userInfo.companyId]);

  const handleAddJob = () => {
    navigate("/manageJob/addJob");
  };

  const enoughJob = stateData.current.jobLength >= stateData.current.totalJobEffect;
  console.log('---------enoughJob',enoughJob)

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <div className="manageJob__header-layout">
        <PathTree className="d-none d-lg-block" />
        {!!userInfo.companyId && !enoughJob && (
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
      <ListJob companyId={userInfo.companyId} enoughJob={enoughJob} />
    </div>
  );
};

export default memo(ManageJob);
