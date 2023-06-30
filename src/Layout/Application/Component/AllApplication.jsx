import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import _ from "underscore";
import { convertToTimeString } from "Config/Support/TimeSupport";
import { WarningModal } from "Components/Modal";
import ProcessApplicationModal from "Components/Modal/ProcessApplicationModal/ProcessApplicationModal";

const AllApplication = ({ listApplication, onSuccess }) => {
  const { t } = useTranslation();
  const [status, setStatus] = useState("");
  const modalRef = useRef();
  const processRef = useRef();
  const statusFilter = [
    {
      value: "",
      label: " " + t("business.application.allStatus"),
    },
    {
      value: "WAITING",
      label: t("business.application.WAITING"),
    },
    {
      value: "ACCEPTED",
      label: t("business.application.ACCEPTED"),
    },
    {
      value: "DENIED",
      label: t("business.application.DENIED"),
    },
  ];

  const onPressNote = (application) => () => {
    modalRef.current.setMessage(application.note);
    modalRef.current.onToggleModal();
  };

  const onProcessApplication = (applicationId, status) => async () => {
    processRef.current.onSetParams({ applicationId, status });
    processRef.current.onToggleModal();
  };

  const onChangeStatus = (_status) => {
    setStatus(_status);
  };

  const _filterOption = (input, option) =>
    (option?.label?.toLowerCase() ?? "").includes(input?.toLowerCase());

  const _filterSort = (optionA, optionB) =>
    (optionA?.label ?? "")
      .toLowerCase()
      .localeCompare((optionB?.label ?? "").toLowerCase());

  return (
    <div>
      <WarningModal
        ref={modalRef}
        title={t("business.job.application.about")}
      />
      <ProcessApplicationModal ref={processRef} onSuccess={onSuccess} />
      {!listApplication.length ? (
        <div className="m-3">
          <p>{t("business.job.application.no")}</p>
        </div>
      ) : (
        <div>
          <div className="ProcessApplicationPage__filter ms-3 mt-2">
            <Select
              showSearch
              defaultValue={""}
              className="form-control jh-box-input"
              placeholder=""
              optionFilterProp="children"
              filterOption={_filterOption}
              filterSort={_filterSort}
              onSelect={onChangeStatus}
              options={statusFilter}
            />
          </div>
          {_.map(
            listApplication.filter((app) =>
              app.applicationStatus?.includes(status)
            ),
            (application, index) => (
              <div
                key={index}
                className="ProcessApplicationPage__item-container d-flex align-items-center ms-3 me-3"
              >
                <Avatar
                  src={application.avatar}
                  width="80px"
                  className="me-2"
                />
                <div className="flex-grow-1">
                  <div>
                    <Link
                      to={`/userInfo/${application.userId}`}
                      className="fz-20"
                    >
                      {application.fullName}
                    </Link>
                  </div>
                  <div>
                    <div>
                      {t("business.job.application.email")} :{" "}
                      <b>{application.email}</b>
                    </div>
                    <div>
                      {t("business.job.application.phone")} :{" "}
                      <b>{application.phone}</b>
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
                        onClick={onProcessApplication(
                          application.applicationId,
                          "DENIED"
                        )}
                        style={{ width: "100%" }}
                      >
                        {t("business.job.application.deny")}
                      </ButtonPrimary>
                    </div>
                  ) : (
                    <div
                      className={`ProcessApplicationPage_item-status ${
                        application.applicationStatus === "ACCEPTED"
                          ? "accept"
                          : "deny"
                      }`}
                    >
                      <i
                        className={`bi ${
                          application.applicationStatus === "ACCEPTED"
                            ? "bi-check-circle-fill"
                            : "bi-x-circle-fill"
                        } me-1`}
                      />
                      {t(
                        `business.application.${application.applicationStatus}`
                      )}
                    </div>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default AllApplication;
