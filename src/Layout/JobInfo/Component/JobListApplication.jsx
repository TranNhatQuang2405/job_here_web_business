import React, { useState } from "react";
import { Avatar } from "Components/Image";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import JobApplicationInfo from "./JobApplicationInfo";

const JobListApplication = ({ data }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [curApplication, setCurApplication] = useState({
    fullName: "",
    phone: "",
    email: "",
    note: "",
    cvUrl: "",
    cvId: 0,
  });
  const timeCreate = (time) => {
    let today = new Date();
    let endDay = new Date(time);
    const diffTime = Math.abs(endDay - today);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleShow = (data) => {
    setCurApplication(data);
    setShow(true);
  };

  const handleUnShow = () => {
    setCurApplication({
      fullName: "",
      phone: "",
      email: "",
      note: "",
      cvUrl: "",
      cvId: 0,
    });
    setShow(false);
  };

  if (data.length === 0)
    return (
      <div>
        <p>{t("business.jobInfo.noApplication")}</p>
      </div>
    );

  return (
    <div className="jobInfo__listApplication-bound">
      <JobApplicationInfo show={show} data={curApplication} onHide={handleUnShow} />
      {data.map((x, key) => (
        <div className="ListJobItem__bound" key={key}>
          <Avatar src={x.avatarUrl} width="80px" />
          <div className="ListJobItem__content">
            <div className="ListJobItem__jobName">
              <Link
                to={`/userInfo/${x.userId}`}
                className="ListJobItem__jobName-link fz-20"
              >
                {x.fullName}
              </Link>
            </div>
            <div className="jobApplication__info">
              <div className="jobApplication__note">{x.note}</div>
              <div className="jobApplication__link" onClick={() => handleShow(x)}>
                {t("business.job.application.view")}
              </div>
            </div>
          </div>
          <div className="ListJobItem__jobTime">
            {`${timeCreate(x.createdDate)} ${t("business.job.application.date")}`}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobListApplication;
