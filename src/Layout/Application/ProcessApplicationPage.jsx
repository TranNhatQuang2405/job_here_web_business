import React, { useState, useEffect, useRef } from "react";
import "./ProcessApplicationPage.css";
import { PathTree } from "Components/Path";
import { LoadingSpinner } from "Components/Loading";
import { Avatar } from "Components/Image";
import { useTranslation } from "react-i18next";
import { useLocation, Link } from "react-router-dom";
import { applicationBusiness, jobBusiness } from "Business";
import _ from "underscore";
import { convertToTimeString } from "Config/Support/TimeSupport";
import { WarningModal } from "Components/Modal";
import { ButtonPrimary } from "Components/Button";
import { success } from "Config/Redux/Slice/AlertSlice";
import { useDispatch } from "react-redux";

const ProcessApplicationPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const [listApplication, setListApplication] = useState([]);
  const [loading, setLoading] = useState(true);
  const modalRef = useRef();

  useEffect(() => {
    getJobData();
  }, []);

  const getJobData = async () => {
    let stringPath = location.pathname;
    let tmpPath = stringPath.split("/");
    let jobId = tmpPath && tmpPath.length > 0 ? tmpPath[tmpPath.length - 1] : 0;
    let res = await jobBusiness.GetJobInfo(jobId);
    if (res.data.httpCode === 200) {
      setJobData(res.data.objectData);
      let jobId = res.data.objectData.jobId;
      await getListApplication(jobId);
    }
  };

  const getListApplication = async (jobId) => {
    if (!loading) setLoading(true);
    let res = await jobBusiness.GetListApplicationOfJob(jobId);
    if (res.data.httpCode === 200) {
      setListApplication(res.data.objectData);
    }
    setLoading(false);
  };

  const onPressNote = (application) => () => {
    modalRef.current.setMessage(application.note);
    modalRef.current.onToggleModal();
  };

  const onProcessApplication = (applicationId, status) => async () => {
    let res = await applicationBusiness.processApplication(applicationId, status);
    if (res.data.httpCode === 200) {
      dispatch(
        success({
          message: res.data.message,
          title: t("processApplication"),
        })
      );
      await getListApplication(jobData.jobId);
    }
  };

  return (
    <div className="ProcessApplicationPage__container">
      <WarningModal ref={modalRef} title={t("business.job.application.about")} />
      <PathTree lastPath={jobData?.jobName || t("CV List")} className="ms-3 pt-2" />
      {loading ? (
        <LoadingSpinner />
      ) : !listApplication.length ? (
        <div className="m-3">
          <p>{t("business.job.application.no")}</p>
        </div>
      ) : (
        <div>
          {_.map(listApplication, (application, index) => (
            <div
              key={index}
              className="ProcessApplicationPage__item-container d-flex align-items-center"
            >
              <Avatar src={application.avatar} width="80px" className="me-2" />
              <div className="flex-grow-1">
                <div>
                  <Link to={`/userInfo/${application.userId}`} className="fz-20">
                    {application.fullName}
                  </Link>
                </div>
                <div>
                  <div>
                    {t("business.job.application.email")} : <b>{application.email}</b>
                  </div>
                  <div>
                    {t("business.job.application.phone")} : <b>{application.phone}</b>
                  </div>
                  <a target="_blank" href={application.cvUrl} rel="noreferrer">
                    {t("business.job.application.view.cv")}
                  </a>
                  {!!application.note && (
                    <div
                      className="ProcessApplicationPage__note cur-pointer"
                      onClick={onPressNote(application)}
                    >
                      {t("business.job.application.view.note")}
                    </div>
                  )}
                </div>
              </div>
              <div className="ProcessApplicationPage_item-btn">
                <div className="mb-2">
                  {convertToTimeString(application.createdDate, t)}
                </div>
                {application.applicationStatus === "WAITING" ? (
                  <div className="text-center">
                    <ButtonPrimary
                      className="mb-3"
                      onClick={onProcessApplication(
                        application.applicationId,
                        "ACCEPTED"
                      )}
                      style={{ width: "100%" }}
                    >
                      {t("business.job.application.accept")}
                    </ButtonPrimary>
                    <ButtonPrimary
                      secondary
                      onClick={onProcessApplication(application.applicationId, "DENIED")}
                      style={{ width: "100%" }}
                    >
                      {t("business.job.application.deny")}
                    </ButtonPrimary>
                  </div>
                ) : (
                  <div
                    className={`ProcessApplicationPage_item-status ${
                      application.applicationStatus === "ACCEPTED" ? "accept" : "deny"
                    }`}
                  >
                    <i
                      className={`bi ${
                        application.applicationStatus === "ACCEPTED"
                          ? "bi-check-circle-fill"
                          : "bi-x-circle-fill"
                      } me-1`}
                    />
                    {t(`business.application.${application.applicationStatus}`)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProcessApplicationPage;
