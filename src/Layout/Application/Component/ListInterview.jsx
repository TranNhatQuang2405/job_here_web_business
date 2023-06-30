import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import _ from "underscore";
import { Avatar } from "Components/Image";
import { WarningModal } from "Components/Modal";
import { convertToTimeString } from "Config/Support/TimeSupport";
import Moment from "moment";

const ListInterview = ({ listInterview }) => {
  const { t } = useTranslation();
  const modalRef = useRef();

  const onPressNote = (application) => () => {
    modalRef.current.setMessage(application.note);
    modalRef.current.onToggleModal();
  };

  return (
    <div>
      <WarningModal ref={modalRef} title={t("business.job.application.about")} />
      {listInterview.length ? (
        _.map(listInterview, (application, index) => (
          <div
            key={index}
            className="ProcessApplicationPage__item-container d-flex align-items-center ms-3 me-3"
          >
            <Avatar src={application.avatar} width="80px" className="ProcessApplicationPage__avatar me-2" />
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
                <a
                  target="_blank"
                  href={
                    application.cvType === "UPLOADED"
                      ? application.cvUrl
                      : `/viewCV/${application.cvId}`
                  }
                  rel="noreferrer"
                >
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
                <div>
                  {t("business.job.application.interviewDate")}:{" "}
                  <b>{Moment(application.interviewDate).format("DD-MM-YYYY")}</b>
                </div>
              </div>
            </div>
            <div className="ProcessApplicationPage_item-btn">
              <div className="mb-2">
                {convertToTimeString(application.createdDate, t)}
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="m-3">
          <p>{t("business.job.application.noInterview")}</p>
        </div>
      )}
    </div>
  );
};

export default ListInterview;
